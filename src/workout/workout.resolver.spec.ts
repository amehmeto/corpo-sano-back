import * as Faker from 'faker'
import { Test, TestingModule } from '@nestjs/testing'
import { WorkoutResolver } from './workout.resolver'
import { WorkoutService } from './workout.service'
import { TypeOrmWorkoutRepository } from './repositories/typeorm-workout.repository'
import { TypeOrmExerciseRepository } from '../exercise/repositories/type-orm-exercise.repository'

function exerciseDataBuilder() {
  const exerciseTitles = ['pompes', 'dips', 'tractions', 'abdos']
  return {
    id: Faker.datatype.uuid(),
    title: Faker.random.arrayElement(exerciseTitles),
  }
}

describe('Workout Resolver', () => {
  let workoutResolver: WorkoutResolver
  let workoutService: WorkoutService

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        TypeOrmWorkoutRepository,
        TypeOrmExerciseRepository,
        WorkoutResolver,
        WorkoutService,
      ],
    }).compile()

    workoutResolver = module.get<WorkoutResolver>(WorkoutResolver)
    workoutService = module.get<WorkoutService>(WorkoutService)
  })

  it('should be defined', () => {
    expect(workoutResolver).toBeDefined()
  })

  it('should create a workout', async () => {
    const workoutInput = {
      title: 'Bas du corps',
      programId: Faker.datatype.uuid(),
    }
    const expectedWorkout = {
      id: expect.any(String),
      ...workoutInput,
    }

    workoutService.create = jest.fn().mockResolvedValue({
      id: Faker.datatype.uuid(),
      title: expectedWorkout.title,
      programId: expectedWorkout.programId,
    })

    const createdWorkout = await workoutResolver.create(
      workoutInput.title,
      workoutInput.programId,
    )

    expect(workoutService.create).toHaveBeenCalledWith(workoutInput)
    expect(createdWorkout).toStrictEqual(expectedWorkout)
  })

  it('should fill workout with exercises', async () => {
    const exercises = Array(3).fill(exerciseDataBuilder())
    const fillWorkoutWithExerciseInput = {
      workoutId: Faker.datatype.uuid(),
      exercisesId: exercises.map((exercise) => exercise.id),
    }
    const expectedWorkout = {
      id: expect.any(String),
      title: 'Haut du bas',
      programId: expect.any(String),
      exercises,
    }

    workoutService.fillWorkoutWithExercises = jest
      .fn()
      .mockResolvedValue(expectedWorkout)

    const filledWorkout = await workoutResolver.fillWorkoutWithExercises(
      fillWorkoutWithExerciseInput,
    )

    expect(filledWorkout).toStrictEqual(expectedWorkout)
  })

  it('should get all workouts exercises', async () => {
    const workoutId = Faker.datatype.uuid()
    const expectedExercises = Array(3).fill(exerciseDataBuilder())

    workoutService.getExercises = jest.fn().mockResolvedValue(expectedExercises)

    const retrievedExercises = await workoutResolver.getExercises(workoutId)

    expect(workoutService.getExercises).toHaveBeenCalled()
    expect(retrievedExercises).toBe(expectedExercises)
  })
})

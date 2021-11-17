import * as Faker from 'faker'
import { Test, TestingModule } from '@nestjs/testing'
import { WorkoutService } from './workout.service'
import { InMemoryExerciseTemplateRepository } from '../exercise/repositories/in-memory-exercise-template.repository'
import { InMemoryWorkoutRepository } from './repositories/in-memory-workout.repository'
import { Workout } from './entities/workout.entity'
import { WeekDays } from './types/week-days.enum'
import { InMemoryExerciseRepository } from '../exercise/repositories/in-memory-exercise.repository'
import {
  EXERCISE_TEMPLATE_REPOSITORY,
  ExerciseTemplateRepository,
} from '../exercise/repositories/exercise-template-repository.interface'
import { Exercise } from '../exercise/entities/exercise.entity'
import { workoutInputDataBuilder } from '../../test/data-builders/workout-input.data-builder'
import {
  WORKOUT_REPOSITORY,
  WorkoutRepository,
} from './repositories/workout-repository.interface'
import { workoutDataBuilder } from '../../test/data-builders/workout.data-builder'
import { EXERCISE_REPOSITORY } from '../exercise/repositories/exercise-repository.interface'

describe('Workout Service', () => {
  let workoutService: WorkoutService
  let workoutRepository: WorkoutRepository
  let exerciseTemplateRepository: ExerciseTemplateRepository

  beforeAll(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        {
          provide: WORKOUT_REPOSITORY,
          useClass: InMemoryWorkoutRepository,
        },
        {
          provide: EXERCISE_TEMPLATE_REPOSITORY,
          useClass: InMemoryExerciseTemplateRepository,
        },
        {
          provide: EXERCISE_REPOSITORY,
          useClass: InMemoryExerciseRepository,
        },
        WorkoutService,
      ],
    }).compile()

    workoutService = module.get<WorkoutService>(WorkoutService)
    workoutRepository = module.get<WorkoutRepository>(WORKOUT_REPOSITORY)
    exerciseTemplateRepository = module.get<ExerciseTemplateRepository>(
      EXERCISE_TEMPLATE_REPOSITORY,
    )
  })

  it('should be defined', () => {
    expect(workoutService).toBeDefined()
  })

  it('should create a workout', async () => {
    const workoutInput = workoutInputDataBuilder()
    const expectedWorkout = new Workout({
      id: expect.any(String),
      title: workoutInput.title,
    })

    const createdWorkout = await workoutService.create(workoutInput)

    expect(createdWorkout).toStrictEqual(expectedWorkout)
  })

  it('should fill a workout with exercises', async () => {
    const exerciseTemplates = await exerciseTemplateRepository.find()
    const [workout] = await workoutRepository.find()
    const fillWorkoutWithExercisesInput = {
      workoutId: workout.id,
      exerciseTemplateIds: exerciseTemplates.map((exercise) => exercise.id),
    }
    const expectedExercises = await Promise.all(
      exerciseTemplates.map(async (template) => {
        return new Exercise({
          id: expect.any(String),
          template: await exerciseTemplateRepository.findById(template.id),
        })
      }),
    )
    const expectedWorkout = new Workout(
      workoutDataBuilder({
        id: fillWorkoutWithExercisesInput.workoutId,
        exercises: expectedExercises,
      }),
    )

    const filledWorkout = await workoutService.fillWorkoutWithExercises(
      fillWorkoutWithExercisesInput,
    )

    expect(filledWorkout).toStrictEqual(expectedWorkout)
  })

  it('should get a workout by id', async () => {
    const [expectedWorkout] = await workoutRepository.find()

    const retrievedWorkout = await workoutService.getById(expectedWorkout.id)

    expect(retrievedWorkout).toStrictEqual(expectedWorkout)
  })

  it("should get all workout's exercises", async () => {
    const workoutId = Faker.datatype.uuid()
    const expectedExercises = [
      {
        workoutId,
      },
    ]

    const retrievedExercises = await workoutService.getExercises(workoutId)

    expect(retrievedExercises).toStrictEqual(expectedExercises)
  })

  it('should schedule workout', async () => {
    const workoutId = Faker.datatype.uuid()
    const daysOfTheWeek = [WeekDays.MONDAY, WeekDays.FRIDAY]
    const scheduleWorkoutInput = {
      workoutId,
      daysOfTheWeek,
    }
    const expectedWorkout = new Workout({
      id: workoutId,
      scheduledDays: daysOfTheWeek,
    })

    const scheduledWorkout = await workoutService.scheduleWorkout(
      scheduleWorkoutInput,
    )

    expect(scheduledWorkout).toStrictEqual(expectedWorkout)
  })

  it('should update a workout', async () => {
    const [workout] = await workoutRepository.find()
    const exercises = workout.exercises
    const tempSwap = exercises[0]
    exercises[0] = exercises[1]
    exercises[1] = tempSwap
    const newWorkout = new Workout(
      workoutDataBuilder({
        title: 'new title',
        exercises,
      }),
    )
    const expectedWorkout = newWorkout

    const updatedWorkout = await workoutService.update(newWorkout)

    expect(updatedWorkout).toStrictEqual(expectedWorkout)
  })

  it('should patch a workout', async () => {
    const [workout] = await workoutRepository.find()
    const newPartialWorkout = {
      title: 'Training legs instead arms now',
    }
    const expectedWorkout = new Workout({
      ...workout,
      ...newPartialWorkout,
    })

    const patchedWorkout = await workoutService.patch(
      workout.id,
      newPartialWorkout,
    )

    expect(patchedWorkout).toStrictEqual(expectedWorkout)
  })
})

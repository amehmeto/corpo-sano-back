import { Args, ID, Mutation, Resolver } from '@nestjs/graphql'
import { Workout } from './models/workout.model'
import { FillWorkoutWithExercisesInput } from './types/fill-workout-with-exercises.input'
import { WorkoutService } from './workout.service'
import { Exercise } from '../exercise/models/exercise.model'

@Resolver()
export class WorkoutResolver {
  constructor(private readonly workoutService: WorkoutService) {}

  @Mutation(() => Workout, {
    name: 'createWorkout',
  })
  async create(
    @Args({ name: 'title', type: () => String }) title: string,
    @Args({ name: 'programId', type: () => ID }) programId: string,
  ): Promise<Workout> {
    const workoutInput = {
      title,
      programId,
    }
    return this.workoutService.create(workoutInput)
  }

  @Mutation(() => Workout, {
    name: 'fillWorkoutWithExercises',
  })
  async fillWorkoutWithExercises(
    @Args('payload')
    payload: FillWorkoutWithExercisesInput,
  ): Promise<Workout> {
    return this.workoutService.fillWorkoutWithExercises(payload)
  }

  async getExercises(workoutId: string): Promise<Exercise[]> {
    return this.workoutService.getExercises(workoutId)
  }

  async scheduleWorkout(daysOfTheWeek: string[]): Promise<Workout> {
    return this.workoutService.scheduleWorkout(daysOfTheWeek)
  }
}

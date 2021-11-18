import { Args, ID, Mutation, Query, Resolver } from '@nestjs/graphql'
import { Workout } from './models/workout.model'
import { FillWorkoutWithExercisesInput } from './types/fill-workout-with-exercises.input'
import { ScheduleWorkoutInput } from './types/schedule-workout.input'
import { WorkoutService } from './workout.service'
import { PatchWorkoutInput } from './types/patch-workout.input'

@Resolver()
export class WorkoutResolver {
  constructor(private readonly workoutService: WorkoutService) {}

  @Query(() => Workout)
  async getWorkout(
    @Args({ name: 'workoutId', type: () => ID }) workoutId: string,
  ): Promise<Workout> {
    return this.workoutService.getById(workoutId)
  }

  @Mutation(() => Workout)
  async createWorkout(
    @Args('title') title: string,
    @Args({ name: 'programId', type: () => ID }) programId: string,
  ): Promise<Workout> {
    const workoutInput = {
      title,
      programId,
    }
    return this.workoutService.create(workoutInput)
  }

  @Mutation(() => Workout)
  async fillWorkoutWithExercises(
    @Args('payload') payload: FillWorkoutWithExercisesInput,
  ): Promise<Workout> {
    return this.workoutService.fillWorkoutWithExercises(payload)
  }

  @Mutation(() => Workout)
  async scheduleWorkout(
    @Args('payload') payload: ScheduleWorkoutInput,
  ): Promise<Workout> {
    return this.workoutService.scheduleWorkout(payload)
  }

  @Mutation(() => Workout)
  async updateWorkout(
    @Args({ name: 'workoutId', type: () => ID }) workoutId: string,
    @Args('payload') payload: PatchWorkoutInput,
  ): Promise<Workout> {
    return this.workoutService.patch(workoutId, payload)
  }
}

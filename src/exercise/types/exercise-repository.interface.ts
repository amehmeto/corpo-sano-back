import { Exercise } from '../entities/exercise.entity'

export interface ExerciseRepository {
  find(): Promise<Exercise[]>
  findById(id: string): Promise<Exercise>
  save(exercise: Partial<Exercise>): Promise<Exercise>
}

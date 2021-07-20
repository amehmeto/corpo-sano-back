import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from 'typeorm'
import { Workout } from '../../workout/entities/workout.entity'

@Entity()
export class Program {
  @PrimaryGeneratedColumn('uuid')
  id: string

  @Column()
  title: string

  @OneToMany((type) => Workout, (workout) => workout.program)
  workouts: Workout[]

  constructor(partial: Partial<Program> | undefined = {}) {
    Object.assign(this, partial)
  }
}

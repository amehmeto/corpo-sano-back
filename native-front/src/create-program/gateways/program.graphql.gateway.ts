import { ProgramGateway } from './program.gateway.interface'
import { Program } from '../entities/program.entity'
import { GraphQLGateway } from '../../_infrastructure/gateway/base.graphql.gateway'
import { WorkoutInput } from '../usecases/create-workout-use.case'
import { ProgramInput } from '../usecases/create-program-use.case'
import { ProgramMapper } from '../mappers/program.mapper'
import { Workout } from '../entities/workout.entity'
import { WorkoutMapper } from '../mappers/workout.mapper'

export class GraphQLProgramGateway
  extends GraphQLGateway
  implements ProgramGateway
{
  async create(programInput: ProgramInput): Promise<Program> {
    try {
      const createProgramMutationPayload = {
        query: `mutation CreateProgram($title: String!) {
          createProgram(title: $title) {
            id
            title
          }
        }`,
        variables: {
          title: programInput.title,
        },
      }

      const createProgram = await this.request(createProgramMutationPayload)
      return ProgramMapper.mapToDomain(createProgram)
    } catch (e) {
      throw this.handleError(e)
    }
  }

  async addWorkout(
    programId: string,
    workoutInput: WorkoutInput,
  ): Promise<Workout> {
    try {
      const addWorkoutMutationPayload = {
        query: `mutation CreateWorkout($title: String!, $programId: ID!) {
          createWorkout(title: $title, programId: $programId) {
            id
            title
          }
        }`,
        variables: {
          title: workoutInput.title,
          programId,
        },
      }

      const createWorkout = await this.request(addWorkoutMutationPayload)
      return WorkoutMapper.mapToDomain(createWorkout)
    } catch (e) {
      throw this.handleError(e)
    }
  }

  deleteWorkout(programId: string, workoutId: string): Promise<boolean> {
    throw new Error('Method not implemented.')
  }

  //TODO to be created in backend
  async find(): Promise<Program[]> {
    try {
      const findProgramQueryPayload = {
        query: `query GetAllPrograms {
          getAllPrograms {
            id
            title
          }
        }`,
        variables: {},
      }

      return await this.request(findProgramQueryPayload)
    } catch (e) {
      throw this.handleError(e)
    }
  }

  findById(programId: string): Promise<Program | undefined> {
    throw new Error('Method not implemented.')
  }
}

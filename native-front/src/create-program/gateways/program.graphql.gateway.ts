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
      const CREATE_PROGRAM_MUTATION = `mutation CreateProgram($title: String!) {
          createProgram(title: $title) {
            id
            title
          }
        }`
      const createProgramMutationPayload = {
        query: CREATE_PROGRAM_MUTATION,
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
      const ADD_WORKOUT_MUTATION = `mutation CreateWorkout($title: String!, $programId: ID!) {
          createWorkout(title: $title, programId: $programId) {
            id
            title
          }
        }`

      const addWorkoutMutationPayload = {
        query: ADD_WORKOUT_MUTATION,
        variables: {
          title: workoutInput.title,
          programId: programId,
        },
      }

      const createWorkout = await this.request(addWorkoutMutationPayload)
      return WorkoutMapper.mapToDomain(createWorkout)
    } catch (e) {
      throw this.handleError(e)
    }
  }

  //TODO should to create in backend
  deleteWorkout(programId: string, workoutId: string): Promise<boolean> {
    return Promise.resolve(false)
  }

  //TODO should to create in backend
  async find(): Promise<Program[]> {
    try {
      const FIND_PROGRAMS_QUERIES = `query GetAllPrograms {
          getAllPrograms {
            id
            title
          }
        }`

      const findProgramQueriesPayload = {
        query: FIND_PROGRAMS_QUERIES,
        variables: {},
      }

      return await this.request(findProgramQueriesPayload)
    } catch (e) {
      throw this.handleError(e)
    }
  }

  //TODO should to create in backend
  findById(programId: string): Promise<Program | undefined> {
    return Promise.resolve(undefined)
  }
}

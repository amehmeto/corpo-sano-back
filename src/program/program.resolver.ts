import { Args, Mutation, Query, Resolver } from '@nestjs/graphql'
import { Program } from './models/program.model'
import { ProgramService } from './program.service'
import { AuthGuard } from '@nestjs/passport'
import { UseGuards } from '@nestjs/common'
import { GqlAuthGuard } from '../auth/gql.auth.guard'

@Resolver(() => Program)
export class ProgramResolver {
  constructor(private readonly programService: ProgramService) {}

  @UseGuards(GqlAuthGuard)
  @Query(() => [Program])
  async getAllPrograms(): Promise<Program[]> {
    return this.programService.getAllPrograms()
  }

  @UseGuards(AuthGuard())
  @Mutation(() => Program)
  async createProgram(@Args('title') title: string): Promise<Program> {
    return this.programService.create(title)
  }
}

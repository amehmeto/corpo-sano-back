import { ProgramRepository } from './program-repository.interface'
import { CreateProgramInput } from '../types/create-program-input.type'
import { Program } from '../entities/program.entity'
import { v4 as uuid } from 'uuid'
import { programFixtures } from '../data-builders/program.data-builder'
import { UpdateResult } from 'typeorm'

export class InMemoryProgramRepository implements ProgramRepository {
  private programsData = programFixtures

  private programs = this.programsData.map((data) => new Program(data))

  save(program: CreateProgramInput): Promise<Program> {
    return Promise.resolve(new Program({ ...program, id: uuid() }))
  }

  getAllPrograms(): Promise<Program[]> {
    return Promise.resolve([new Program(), new Program()])
  }

  getProgram(programId: string): Promise<Program> {
    return Promise.resolve(
      this.programsData.find((program) => program.id == programId),
    )
  }

  find(): Promise<Program[]> {
    return Promise.resolve(this.programs)
  }

  softDelete(programId: string): Promise<UpdateResult> {
    const softDeletedProgram = new UpdateResult()
    return Promise.resolve(softDeletedProgram)
  }
}

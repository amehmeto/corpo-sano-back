import { Injectable } from '@nestjs/common'
import { Athlete } from './entities/athlete.entity'
import { CreateAthleteWithPhysicalInfosInput } from './types/create-athlete-with-physical-infos.input'
import { InjectRepository } from '@nestjs/typeorm'
import { AthleteRepository } from './repositories/athlete-repository.interface'
import { TypeOrmAthleteRepository } from './repositories/typeorm-athlete.repository'

@Injectable()
export class AthleteService {
  constructor(
    @InjectRepository(TypeOrmAthleteRepository)
    private readonly athleteRepository: AthleteRepository,
  ) {}
  createAthleteWithPhysicalInfos(
    createAthleteWithPhysicalInfosInput: CreateAthleteWithPhysicalInfosInput,
  ): Promise<Athlete> {
    return this.athleteRepository.createAthleteWithPhysicalInfos(
      createAthleteWithPhysicalInfosInput,
    )
  }
}

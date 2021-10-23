import { AthleteRepository } from './athlete-repository.interface'
import { TypeOrmModule, TypeOrmModuleOptions } from '@nestjs/typeorm'
import { Test } from '@nestjs/testing'
import { config } from '../../../config'
import { TypeOrmAthleteRepository } from './typeorm-athlete.repository'
import { Athlete } from '../entities/athlete.entity'
import { athleteDataBuilder } from '../../../test/data-builders/athlete.data-builder'

const athleteFixture = new Athlete(athleteDataBuilder())

describe('TypeOrmAthleteRepository', () => {
  let athleteRepository: AthleteRepository

  beforeAll(async () => {
    const module = await Test.createTestingModule({
      imports: [
        TypeOrmModule.forRoot(config.db as TypeOrmModuleOptions),
        TypeOrmModule.forFeature([TypeOrmAthleteRepository]),
      ],
    }).compile()

    athleteRepository = module.get<TypeOrmAthleteRepository>(
      TypeOrmAthleteRepository,
    )

    await athleteRepository.save(athleteFixture)
  })

  it('should be defined', () => {
    expect(athleteRepository).toBeDefined()
  })

  it('should find an athlete by id', async () => {
    const expectedAthlete = new Athlete({
      ...athleteFixture,
      //birthday: expect.any(Date),
    })

    const retrievedAthlete = await athleteRepository.findById(athleteFixture.id)

    expect(retrievedAthlete).toStrictEqual(expectedAthlete)
  })
})

import * as Faker from 'faker'
import { Test, TestingModule } from '@nestjs/testing'
import { Repository } from 'typeorm'
import { Workout } from './entities/workout.entity'
import { WorkoutService } from './workout.service'
import { getRepositoryToken } from '@nestjs/typeorm'
import { Program } from '../program/entities/program.entity'

describe('WorkoutService', () => {
  let service: WorkoutService
  let repository: Repository<Workout>
  let programRepository: Repository<Program>

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        WorkoutService,
        {
          provide: getRepositoryToken(Workout),
          useValue: {},
        },
        {
          provide: getRepositoryToken(Program),
          useValue: {},
        },
      ],
    }).compile()

    service = module.get<WorkoutService>(WorkoutService)
    repository = module.get<Repository<Workout>>(getRepositoryToken(Workout))
    programRepository = module.get<Repository<Program>>(
      getRepositoryToken(Program),
    )
  })

  it('should be defined', () => {
    expect(service).toBeDefined()
  })

  it('should create a program', async () => {
    const workoutInput = {
      title: 'Bas du corps',
      programId: Faker.datatype.uuid(),
    }
    const expectedWorkout = {
      id: expect.any(String),
      ...workoutInput,
    }

    repository.save = jest.fn().mockResolvedValue({
      id: Faker.datatype.uuid(),
      ...workoutInput,
    })

    const createdProgram = await service.create(workoutInput)

    expect(repository.save).toHaveBeenCalledWith({
      id: expect.any(String),
      title: workoutInput.title,
    })
    expect(createdProgram).toStrictEqual(expectedWorkout)
  })
})

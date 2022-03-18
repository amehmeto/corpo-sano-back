import { Biometrics } from '../entities/biometrics.entity'
import { Athlete } from '../entities/athlete.entity'
import { DailyTask } from '../entities/daily-task.entity'

export class AthleteMapper {
  static mapToDomain(rawAthlete: any) {
    const rawBiometrics = rawAthlete.biometrics
    const mappedDailyTasks: DailyTask[] = rawAthlete.dailyTasks.map(
      (dailyTask: DailyTask) => {
        return new DailyTask(
          dailyTask.id,
          dailyTask.description,
          dailyTask.route,
        )
      },
    )

    const mappedBiometrics = new Biometrics(
      rawBiometrics.bodyFat,
      rawBiometrics.height,
      rawBiometrics.weight,
      rawBiometrics.lengthUnit,
      rawBiometrics.weightUnit,
      rawBiometrics.gender,
      rawBiometrics.birthday,
      rawBiometrics.weightGoal,
    )
    return new Athlete(
      rawAthlete.id,
      rawAthlete.name,
      rawAthlete.email,
      rawAthlete.password,
      rawAthlete.avatar,
      mappedBiometrics,
      mappedDailyTasks,
      rawAthlete.programs,
    )
  }
}

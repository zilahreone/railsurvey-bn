import { User } from "src/users/entities/user.entity";
import { Column, CreateDateColumn, Entity, ManyToOne, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

class Coordinates {
  @Column({ type: 'float', nullable: true })
  latitude: number

  @Column({ type: 'float', nullable: true})
  longitude: number
}

class RailType {
  @Column({ length: 30 })
  type: string
  
  @Column({ type: 'float' })
  weight: number
}

class Telegram {
  @Column({ length: 30 })
  telegramBefore: string
  
  @Column({ length: 30 })
  telegramAfter: string
}

class Nearby {
  @Column({ length: 30 })
  stationBefore: string
  
  @Column({ length: 30 })
  stationAfter: string
}

class GeneralSurvey {
  @Column('datetime')
  date: string

  // @Column({ length: 50 })
  // area: string

  @Column({ length: 50 })
  zone: string

  // @Column({ length: 50 })
  // station: string

  @Column(() => Coordinates)
  coordinates: Coordinates

  @Column({ type: 'int', nullable: true })
  kilometers: number

  @Column(() => Telegram)
  telegram: Telegram

  @Column(() => Nearby)
  nearby: Nearby

  @Column(() => RailType)
  railType: RailType

  @Column('simple-array')
  areaCondition: string[]
}

class RailDamageSurvey {

  // @Column('jsonb')
  // @Column('simple-array')
  // @Column({
  //   type: 'simple-array',
  //   transformer: {
  //     to: (value: string[]) => value,
  //     from: (value: string[]) => value.map(val => JSON.parse(val.replace(/\|/g, ',')))
  //   }
  // })
  // uploadImages: string[]

  @Column('simple-array')
  uploadImages: string[]

  @Column('simple-array')
  situation: string[]

  @Column('simple-array')
  location: string[]

  @Column('simple-array')
  defectPattern: string[]

  // @Column('simple-array')
  // surfaceDefectPattern: string[]
}

class TrackDamageSurvey {
  // @Column('jsonb')
  // @Column('simple-array')
  // @Column({
  //   type: 'simple-array',
  //   transformer: {
  //     to: (value: string[]) => value,
  //     from: (value: string[]) => value.map(val => JSON.parse(val.replace(/\|/g, ',')))
  //   }
  // })

  @Column('simple-array')
  uploadImages: string[]

  @Column('simple-array')
  trackGeometryCondition: string[]

  @Column('simple-array')
  ballastCondition: string[]

  // @Column({ length: 30 })
  // ballastCompaction: string

  @Column('simple-array')
  sleeperCondition: string[]

  // @Column({ length: 30 })
  // sleeperType: string

  @Column({ length: 30 })
  trackFoundationCondition: string
}

class MaintenanceRecord {

  @Column('boolean')
  hasMaintenanceRecord: boolean

  @Column({ length: 30, nullable: true })
  lastMaintenanceTimes: string

  @Column({ length: 30, nullable: true })
  yearlyMaintenanceTimes: string
}

class MaintenanceRate {
  
  @Column({ length: 30 })
  severity: string
  
  @Column('boolean')
  isAnalyzeDamage: boolean
  
  @Column(() => MaintenanceRecord)
  maintenanceRecord: MaintenanceRecord
  
  // @Column({type: 'text', nullable: true })
  // comment: string

  @Column('simple-array')
  maintenanceMethod: string[]
}

@Entity()
export class RailSurvey {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column(() => GeneralSurvey)
  generalSurvey: GeneralSurvey
  
  @Column(() => RailDamageSurvey)
  railDamageSurvey: RailDamageSurvey
  
  @Column(() => TrackDamageSurvey)
  trackDamageSurvey: TrackDamageSurvey
  
  @Column(() => MaintenanceRate)
  maintenanceRate: MaintenanceRate
  
  @Column({ type: 'text' })
  signature: string
  
  @CreateDateColumn()
  createdAt: Date
  
  @UpdateDateColumn()
  modifiedAt: Date

  // @Column({ length: 50 })
  // createdBy: string
  
  @ManyToOne(() => User, user => user.id)
  // @Column({ length: 50 })
  modifiedBy: string

  @ManyToOne(() => User, user => user.id)
  // @JoinColumn({ name: 'user_id', referencedColumnName: 'id' })
  createdBy: User
}

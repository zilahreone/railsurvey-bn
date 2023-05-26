import { RailSurvey } from "src/rail-survey/entities/rail-survey.entity";
import { Column, Entity, OneToMany, PrimaryColumn, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class User {
  @PrimaryGeneratedColumn('uuid')
  id: string;
  
  @Column({ length: 30 })
  username: string;

  @Column({ length: 30 })
  firstName: string;
  
  @Column({ length: 30 })
  lastName: string;
  
  @Column({ length: 30, nullable: true })
  email: string;

  @OneToMany(() => RailSurvey, rail => rail.createdBy)
  survey: RailSurvey[]
}

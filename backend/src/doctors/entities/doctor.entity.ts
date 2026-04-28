import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  OneToOne,
  JoinColumn,
  OneToMany,
} from 'typeorm';
import { User } from '../../users/entities/user.entity';
import { Prescription } from '../../prescriptions/entities/prescription.entity';
import { Analysis } from '../../analyses/entities/analysis.entity';

@Entity('doctors')
export class Doctor {
  @PrimaryGeneratedColumn()
  id_doctor: number;

  @Column({ nullable: true })
  first_name: string;

  @Column({ nullable: true })
  last_name: string;

  @Column({ nullable: true })
  specialization: string;

  @Column({ nullable: true })
  license_number: string;

  @Column({ nullable: true })
  hospital_affiliation: string;

  @OneToOne(() => User, (user) => user.doctor)
  @JoinColumn({ name: 'id_user' })
  user: User;

  @OneToMany(() => Prescription, (prescription) => prescription.doctor)
  prescriptions: Prescription[];

  @OneToMany(() => Analysis, (analysis) => analysis.doctor)
  analyses: Analysis[];
}

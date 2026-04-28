import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  JoinColumn,
  CreateDateColumn,
} from 'typeorm';
import { Patient } from '../../patients/entities/patient.entity';
import { Doctor } from '../../doctors/entities/doctor.entity';

@Entity('analyses')
export class Analysis {
  @PrimaryGeneratedColumn()
  id_analysis: number;

  @ManyToOne(() => Patient, (patient) => patient.analyses)
  @JoinColumn({ name: 'id_patient' })
  patient: Patient;

  @ManyToOne(() => Doctor, (doctor) => doctor.analyses, { nullable: true })
  @JoinColumn({ name: 'doctor_id' })
  doctor: Doctor;

  @Column()
  exam_name: string;

  @Column({ nullable: true })
  result: string;

  @Column({ nullable: true })
  reference_range: string;

  @Column({ type: 'enum', enum: ['normal', 'elevated', 'low', 'pending'], default: 'pending' })
  status: string;

  @Column({ type: 'text', nullable: true })
  analysis_results: string;

  @Column({ type: 'date' })
  date_of_analysis: string;

  @Column({ nullable: true })
  category: string;
}

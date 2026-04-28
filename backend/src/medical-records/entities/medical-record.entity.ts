import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  JoinColumn,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';
import { Patient } from '../../patients/entities/patient.entity';

@Entity('medical_records')
export class MedicalRecord {
  @PrimaryGeneratedColumn()
  id_record: number;

  @ManyToOne(() => Patient, (patient) => patient.medical_records)
  @JoinColumn({ name: 'id_patient' })
  patient: Patient;

  @Column({ type: 'text', nullable: true })
  diagnosis: string;

  @Column({ type: 'text', nullable: true })
  treatment: string;

  @Column({ nullable: true })
  doctor_name: string;

  @Column({ nullable: true })
  visit_reason: string;

  @Column({ type: 'enum', enum: ['completed', 'in_progress', 'scheduled'], default: 'completed' })
  status: string;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}

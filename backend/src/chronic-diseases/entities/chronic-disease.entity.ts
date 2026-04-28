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

@Entity('chronic_diseases')
export class ChronicDisease {
  @PrimaryGeneratedColumn()
  id_chronic_disease: number;

  @Column()
  disease_name: string;

  @Column({ type: 'text', nullable: true })
  description: string;

  @Column({ type: 'date', nullable: true })
  diagnosed_at: string;

  @Column({ nullable: true })
  severity: string;

  @Column({ type: 'text', nullable: true })
  current_treatment: string;

  @Column({ type: 'text', nullable: true })
  notes: string;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;

  @ManyToOne(() => Patient, (patient) => patient.chronic_disease_records, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'id_patient' })
  patient: Patient;
}

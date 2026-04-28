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

@Entity('prescriptions')
export class Prescription {
  @PrimaryGeneratedColumn()
  id_prescription: number;

  @ManyToOne(() => Patient, (patient) => patient.prescriptions)
  @JoinColumn({ name: 'id_patient' })
  patient: Patient;

  @ManyToOne(() => Doctor, (doctor) => doctor.prescriptions, { nullable: true })
  @JoinColumn({ name: 'doctor_id' })
  doctor: Doctor;

  @Column()
  medication: string;

  @Column({ nullable: true })
  dosage: string;

  @Column({ nullable: true })
  frequency: string;

  @Column({ nullable: true })
  duration: string;

  @Column({ type: 'text', nullable: true })
  instructions: string;

  @Column({ type: 'date' })
  prescribed_on: string;

  @Column({ type: 'enum', enum: ['active', 'expired', 'cancelled'], default: 'active' })
  status: string;
}

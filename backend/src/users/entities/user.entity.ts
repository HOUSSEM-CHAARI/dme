import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  OneToOne,
} from 'typeorm';
import { Patient } from '../../patients/entities/patient.entity';
import { Doctor } from '../../doctors/entities/doctor.entity';
import { Staff } from '../../staff/entities/staff.entity';

export enum UserRole {
  PATIENT = 'patient',
  DOCTOR = 'doctor',
  STAFF = 'staff',
}

@Entity('users')
export class User {
  @PrimaryGeneratedColumn()
  id_user: number;

  @Column({ unique: true })
  email: string;

  @Column()
  password_hash: string;

  @Column({ type: 'enum', enum: UserRole })
  role: UserRole;

  @Column({ default: true })
  is_active: boolean;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;

  @OneToOne(() => Patient, (patient) => patient.user, { nullable: true })
  patient: Patient;

  @OneToOne(() => Doctor, (doctor) => doctor.user, { nullable: true })
  doctor: Doctor;

  @OneToOne(() => Staff, (staff) => staff.user, { nullable: true })
  staff: Staff;
}

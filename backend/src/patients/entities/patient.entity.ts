import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  OneToOne,
  JoinColumn,
  OneToMany,
} from 'typeorm';
import { User } from '../../users/entities/user.entity';
import { MedicalRecord } from '../../medical-records/entities/medical-record.entity';
import { Prescription } from '../../prescriptions/entities/prescription.entity';
import { Analysis } from '../../analyses/entities/analysis.entity';
import { Document } from '../../documents/entities/document.entity';

@Entity('patients')
export class Patient {
  @PrimaryGeneratedColumn()
  id_patient: number;

  @Column()
  first_name: string;

  @Column()
  last_name: string;

  @Column({ type: 'date', nullable: true })
  dob: string;

  @Column({ nullable: true })
  phone_number: string;

  @Column({ type: 'text', nullable: true })
  address: string;

  @Column({ nullable: true })
  blood_type: string;

  @Column({ type: 'text', nullable: true })
  allergies: string;

  @Column({ type: 'text', nullable: true })
  chronic_diseases: string;

  @OneToOne(() => User, (user) => user.patient)
  @JoinColumn({ name: 'id_user' })
  user: User;

  @OneToMany(() => MedicalRecord, (record) => record.patient)
  medical_records: MedicalRecord[];

  @OneToMany(() => Prescription, (prescription) => prescription.patient)
  prescriptions: Prescription[];

  @OneToMany(() => Analysis, (analysis) => analysis.patient)
  analyses: Analysis[];

  @OneToMany(() => Document, (doc) => doc.patient)
  documents: Document[];
}

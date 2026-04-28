import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  JoinColumn,
  CreateDateColumn,
} from 'typeorm';
import { Patient } from '../../patients/entities/patient.entity';

@Entity('documents')
export class Document {
  @PrimaryGeneratedColumn()
  id_document: number;

  @ManyToOne(() => Patient, (patient) => patient.documents)
  @JoinColumn({ name: 'id_patient' })
  patient: Patient;

  @Column()
  name: string;

  @Column({ nullable: true })
  file_type: string;

  @Column({ nullable: true })
  file_path: string;

  @Column({ nullable: true })
  file_size: string;

  @Column({ nullable: true })
  added_by: string;

  @CreateDateColumn()
  date_added: Date;
}

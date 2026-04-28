import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ReportsController } from './reports.controller';
import { ReportsService } from './reports.service';
import { Patient } from '../patients/entities/patient.entity';
import { MedicalRecord } from '../medical-records/entities/medical-record.entity';
import { Prescription } from '../prescriptions/entities/prescription.entity';
import { Analysis } from '../analyses/entities/analysis.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Patient, MedicalRecord, Prescription, Analysis])],
  controllers: [ReportsController],
  providers: [ReportsService],
  exports: [ReportsService],
})
export class ReportsModule {}

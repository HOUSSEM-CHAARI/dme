import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AnalysesService } from './analyses.service';
import { Analysis } from './entities/analysis.entity';
import { Patient } from '../patients/entities/patient.entity';
import { Doctor } from '../doctors/entities/doctor.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Analysis, Patient, Doctor])],
  providers: [AnalysesService],
  exports: [AnalysesService],
})
export class AnalysesModule {}

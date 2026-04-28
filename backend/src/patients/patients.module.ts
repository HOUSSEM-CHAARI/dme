import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PatientsController } from './patients.controller';
import { PatientsService } from './patients.service';
import { Patient } from './entities/patient.entity';
import { MedicalRecordsModule } from '../medical-records/medical-records.module';
import { PrescriptionsModule } from '../prescriptions/prescriptions.module';
import { AnalysesModule } from '../analyses/analyses.module';
import { DocumentsModule } from '../documents/documents.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([Patient]),
    MedicalRecordsModule,
    PrescriptionsModule,
    AnalysesModule,
    DocumentsModule,
  ],
  controllers: [PatientsController],
  providers: [PatientsService],
  exports: [PatientsService],
})
export class PatientsModule {}

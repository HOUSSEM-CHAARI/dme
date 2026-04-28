import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { AppController } from './app.controller';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import { PatientsModule } from './patients/patients.module';
import { DoctorsModule } from './doctors/doctors.module';
import { MedicalRecordsModule } from './medical-records/medical-records.module';
import { PrescriptionsModule } from './prescriptions/prescriptions.module';
import { AnalysesModule } from './analyses/analyses.module';
import { DocumentsModule } from './documents/documents.module';
import { ReportsModule } from './reports/reports.module';
import { ChronicDiseasesModule } from './chronic-diseases/chronic-diseases.module';
import { StaffModule } from './staff/staff.module';

// Entities
import { User } from './users/entities/user.entity';
import { Patient } from './patients/entities/patient.entity';
import { Doctor } from './doctors/entities/doctor.entity';
import { MedicalRecord } from './medical-records/entities/medical-record.entity';
import { Prescription } from './prescriptions/entities/prescription.entity';
import { Analysis } from './analyses/entities/analysis.entity';
import { Document } from './documents/entities/document.entity';
import { ChronicDisease } from './chronic-diseases/entities/chronic-disease.entity';
import { Staff } from './staff/entities/staff.entity';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: (config: ConfigService) => ({
        type: 'mysql',
        host: config.get('DB_HOST', 'localhost'),
        port: config.get<number>('DB_PORT', 3306),
        username: config.get('DB_USER', 'root'),
        password: config.get('DB_PASSWORD', ''),
        database: config.get('DB_NAME', 'dme_db'),
        entities: [User, Patient, Doctor, MedicalRecord, Prescription, Analysis, Document, ChronicDisease, Staff],
        synchronize: config.get('NODE_ENV') !== 'production',
        logging: config.get('NODE_ENV') === 'development',
      }),
      inject: [ConfigService],
    }),
    AuthModule,
    UsersModule,
    PatientsModule,
    DoctorsModule,
    MedicalRecordsModule,
    PrescriptionsModule,
    AnalysesModule,
    DocumentsModule,
    ReportsModule,
    ChronicDiseasesModule,
    StaffModule,
  ],
  controllers: [AppController],
})
export class AppModule {}

import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DocumentsService } from './documents.service';
import { Document } from './entities/document.entity';
import { Patient } from '../patients/entities/patient.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Document, Patient])],
  providers: [DocumentsService],
  exports: [DocumentsService],
})
export class DocumentsModule {}

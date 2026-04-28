import {
  Controller, Get, Post, Put, Body, Param, Query,
  UseGuards, Req, ParseIntPipe, UseInterceptors, UploadedFile, Res, NotFoundException
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { extname } from 'path';
import { Response } from 'express';
import * as fs from 'fs';
import { PatientsService } from './patients.service';
import { MedicalRecordsService } from '../medical-records/medical-records.service';
import { PrescriptionsService } from '../prescriptions/prescriptions.service';
import { AnalysesService } from '../analyses/analyses.service';
import { DocumentsService } from '../documents/documents.service';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { RolesGuard } from '../auth/guards/roles.guard';
import { Roles } from '../auth/decorators/roles.decorator';
import { UserRole } from '../users/entities/user.entity';

@Controller('patients')
@UseGuards(JwtAuthGuard, RolesGuard)
export class PatientsController {
  constructor(
    private readonly patientsService: PatientsService,
    private readonly medicalRecordsService: MedicalRecordsService,
    private readonly prescriptionsService: PrescriptionsService,
    private readonly analysesService: AnalysesService,
    private readonly documentsService: DocumentsService,
  ) {}

  // === PATIENT LIST (doctors & staff only) ===
  @Get()
  @Roles(UserRole.DOCTOR, UserRole.STAFF)
  findAll(@Query('search') search?: string) {
    return this.patientsService.findAll(search);
  }

  @Post()
  @Roles(UserRole.DOCTOR, UserRole.STAFF)
  create(@Body() body: any) {
    return this.patientsService.create(body);
  }

  // === MY PATIENT PROFILE (patient role) ===
  @Get('me')
  @Roles(UserRole.PATIENT)
  getMyProfile(@Req() req: any) {
    return this.patientsService.findByUserId(req.user.id_user);
  }

  // === SINGLE PATIENT ===
  @Get(':id')
  @Roles(UserRole.DOCTOR, UserRole.STAFF, UserRole.PATIENT)
  findOne(@Param('id', ParseIntPipe) id: number, @Req() req: any) {
    return this.patientsService.findOne(id, req.user);
  }

  @Put(':id')
  @Roles(UserRole.DOCTOR, UserRole.STAFF, UserRole.PATIENT)
  update(@Param('id', ParseIntPipe) id: number, @Body() body: any) {
    return this.patientsService.update(id, body);
  }

  // === MEDICAL RECORDS ===
  @Get(':id/records')
  @Roles(UserRole.DOCTOR, UserRole.STAFF, UserRole.PATIENT)
  getRecords(@Param('id', ParseIntPipe) id: number, @Req() req: any) {
    return this.medicalRecordsService.findByPatient(id, req.user);
  }

  @Post(':id/records')
  @Roles(UserRole.DOCTOR)
  addRecord(
    @Param('id', ParseIntPipe) id: number,
    @Body() body: any,
    @Req() req: any,
  ) {
    return this.medicalRecordsService.create(id, body, req.user);
  }

  @Put(':id/records/:recordId')
  @Roles(UserRole.DOCTOR)
  updateRecord(
    @Param('recordId', ParseIntPipe) recordId: number,
    @Body() body: any,
  ) {
    return this.medicalRecordsService.update(recordId, body);
  }

  // === PRESCRIPTIONS ===
  @Get(':id/prescriptions')
  @Roles(UserRole.DOCTOR, UserRole.STAFF, UserRole.PATIENT)
  getPrescriptions(@Param('id', ParseIntPipe) id: number, @Req() req: any) {
    return this.prescriptionsService.findByPatient(id, req.user);
  }

  @Post(':id/prescriptions')
  @Roles(UserRole.DOCTOR)
  addPrescription(
    @Param('id', ParseIntPipe) id: number,
    @Body() body: any,
    @Req() req: any,
  ) {
    return this.prescriptionsService.create(id, body, req.user);
  }

  @Put(':id/prescriptions/:prescriptionId')
  @Roles(UserRole.DOCTOR)
  updatePrescription(
    @Param('prescriptionId', ParseIntPipe) prescriptionId: number,
    @Body() body: any,
  ) {
    return this.prescriptionsService.update(prescriptionId, body);
  }

  // === ANALYSES ===
  @Get(':id/analyses')
  @Roles(UserRole.DOCTOR, UserRole.STAFF, UserRole.PATIENT)
  getAnalyses(@Param('id', ParseIntPipe) id: number, @Req() req: any) {
    return this.analysesService.findByPatient(id, req.user);
  }

  @Post(':id/analyses')
  @Roles(UserRole.DOCTOR)
  addAnalysis(
    @Param('id', ParseIntPipe) id: number,
    @Body() body: any,
    @Req() req: any,
  ) {
    return this.analysesService.create(id, body, req.user);
  }

  // === DOCUMENTS ===
  @Get(':id/documents')
  @Roles(UserRole.DOCTOR, UserRole.STAFF, UserRole.PATIENT)
  getDocuments(@Param('id', ParseIntPipe) id: number) {
    return this.documentsService.findByPatient(id);
  }

  @Post(':id/documents')
  @Roles(UserRole.DOCTOR, UserRole.STAFF)
  @UseInterceptors(FileInterceptor('file', {
    storage: diskStorage({
      destination: (req, file, cb) => {
        const uploadPath = './uploads/documents';
        if (!fs.existsSync(uploadPath)) {
          fs.mkdirSync(uploadPath, { recursive: true });
        }
        cb(null, uploadPath);
      },
      filename: (req, file, cb) => {
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
        const ext = extname(file.originalname);
        cb(null, `${uniqueSuffix}${ext}`);
      },
    }),
  }))
  addDocument(
    @Param('id', ParseIntPipe) id: number,
    @UploadedFile() file: Express.Multer.File,
    @Body() body: any,
    @Req() req: any,
  ) {
    if (!file) throw new NotFoundException('Fichier requis');
    const documentData = {
      name: body.name || file.originalname,
      file_type: extname(file.originalname).substring(1).toUpperCase() || 'UNKNOWN',
      file_path: file.path,
      file_size: `${(file.size / 1024).toFixed(2)} KB`,
    };
    return this.documentsService.create(id, documentData, req.user);
  }

  @Get(':id/documents/:documentId/download')
  @Roles(UserRole.DOCTOR, UserRole.STAFF, UserRole.PATIENT)
  async downloadDocument(
    @Param('id', ParseIntPipe) id: number,
    @Param('documentId', ParseIntPipe) documentId: number,
    @Res() res: Response
  ) {
    const document = await this.documentsService.findOne(documentId);
    if (!document || document.patient.id_patient !== id) {
      throw new NotFoundException('Document non trouvé');
    }
    if (!fs.existsSync(document.file_path)) {
      throw new NotFoundException('Fichier introuvable sur le serveur');
    }
    return res.download(document.file_path, document.name);
  }

  // === REPORTS ===
  @Get(':id/reports')
  @Roles(UserRole.DOCTOR, UserRole.STAFF, UserRole.PATIENT)
  getReports(@Param('id', ParseIntPipe) id: number, @Req() req: any) {
    return this.patientsService.findOne(id, req.user);
  }
}

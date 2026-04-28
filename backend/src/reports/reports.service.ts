import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, Between } from 'typeorm';
import { Patient } from '../patients/entities/patient.entity';
import { MedicalRecord } from '../medical-records/entities/medical-record.entity';
import { Prescription } from '../prescriptions/entities/prescription.entity';
import { Analysis } from '../analyses/entities/analysis.entity';

@Injectable()
export class ReportsService {
  constructor(
    @InjectRepository(Patient) private patientRepo: Repository<Patient>,
    @InjectRepository(MedicalRecord) private recordRepo: Repository<MedicalRecord>,
    @InjectRepository(Prescription) private prescriptionRepo: Repository<Prescription>,
    @InjectRepository(Analysis) private analysisRepo: Repository<Analysis>,
  ) {}

  async generatePatientReport(
    patientId: number,
    type: string,
    startDate?: string,
    endDate?: string,
  ) {
    const patient = await this.patientRepo.findOne({ where: { id_patient: patientId } });
    if (!patient) throw new NotFoundException('Patient non trouvé');

    const dateFilter =
      startDate && endDate
        ? { created_at: Between(new Date(startDate), new Date(endDate)) }
        : {};

    const report: any = {
      report_type: type,
      generated_at: new Date().toISOString(),
      patient: {
        id: patient.id_patient,
        name: `${patient.first_name} ${patient.last_name}`,
        dob: patient.dob,
        blood_type: patient.blood_type,
      },
      period: { start: startDate, end: endDate },
    };

    if (type === 'full' || type === 'records') {
      report.medical_records = await this.recordRepo.find({
        where: { patient: { id_patient: patientId }, ...dateFilter },
        order: { created_at: 'DESC' },
      });
    }

    if (type === 'full' || type === 'prescriptions') {
      report.prescriptions = await this.prescriptionRepo.find({
        where: { patient: { id_patient: patientId } },
        relations: ['doctor'],
        order: { prescribed_on: 'DESC' },
      });
    }

    if (type === 'full' || type === 'analyses') {
      report.analyses = await this.analysisRepo.find({
        where: { patient: { id_patient: patientId } },
        order: { date_of_analysis: 'DESC' },
      });
    }

    return report;
  }

  async getDashboardStats() {
    const totalPatients = await this.patientRepo.count();
    const totalRecords = await this.recordRepo.count();
    const totalPrescriptions = await this.prescriptionRepo.count();
    const totalAnalyses = await this.analysisRepo.count();

    return {
      total_patients: totalPatients,
      total_records: totalRecords,
      total_prescriptions: totalPrescriptions,
      total_analyses: totalAnalyses,
    };
  }
}

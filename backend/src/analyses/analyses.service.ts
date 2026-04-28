import { Injectable, NotFoundException, ForbiddenException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Analysis } from './entities/analysis.entity';
import { Patient } from '../patients/entities/patient.entity';
import { Doctor } from '../doctors/entities/doctor.entity';
import { UserRole } from '../users/entities/user.entity';

@Injectable()
export class AnalysesService {
  constructor(
    @InjectRepository(Analysis) private analysisRepo: Repository<Analysis>,
    @InjectRepository(Patient) private patientRepo: Repository<Patient>,
    @InjectRepository(Doctor) private doctorRepo: Repository<Doctor>,
  ) {}

  async findByPatient(patientId: number, requestingUser: any) {
    const patient = await this.patientRepo.findOne({
      where: { id_patient: patientId },
      relations: ['user'],
    });
    if (!patient) throw new NotFoundException('Patient non trouvé');

    if (
      requestingUser.role === UserRole.PATIENT &&
      patient.user?.id_user !== requestingUser.id_user
    ) {
      throw new ForbiddenException('Accès refusé');
    }

    return this.analysisRepo.find({
      where: { patient: { id_patient: patientId } },
      relations: ['doctor'],
      order: { date_of_analysis: 'DESC' },
    });
  }

  async create(patientId: number, data: any, requestingUser: any) {
    const patient = await this.patientRepo.findOne({ where: { id_patient: patientId } });
    if (!patient) throw new NotFoundException('Patient non trouvé');

    let doctor: Doctor | null = null;
    if (requestingUser.doctor) {
      doctor = await this.doctorRepo.findOne({
        where: { id_doctor: requestingUser.doctor.id_doctor },
      });
    }

    const analysis = this.analysisRepo.create({
      ...data,
      patient,
      doctor,
      date_of_analysis: data.date_of_analysis || new Date().toISOString().split('T')[0],
    });
    return this.analysisRepo.save(analysis);
  }
}

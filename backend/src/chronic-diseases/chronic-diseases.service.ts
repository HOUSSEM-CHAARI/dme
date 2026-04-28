import { Injectable, NotFoundException, ForbiddenException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ChronicDisease } from './entities/chronic-disease.entity';
import { Patient } from '../patients/entities/patient.entity';
import { UserRole } from '../users/entities/user.entity';

@Injectable()
export class ChronicDiseasesService {
  constructor(
    @InjectRepository(ChronicDisease) private diseaseRepo: Repository<ChronicDisease>,
    @InjectRepository(Patient) private patientRepo: Repository<Patient>,
  ) {}

  async findByPatient(patientId: number, requestingUser: any) {
    // Patients can only see their own diseases
    if (requestingUser.role === UserRole.PATIENT) {
      const patient = await this.patientRepo.findOne({
        where: { user: { id_user: requestingUser.id_user } },
      });
      if (!patient || patient.id_patient !== patientId) {
        throw new ForbiddenException('Accès refusé');
      }
    }

    return this.diseaseRepo.find({
      where: { patient: { id_patient: patientId } },
      order: { diagnosed_at: 'DESC' },
    });
  }

  async findMyDiseases(userId: number) {
    const patient = await this.patientRepo.findOne({
      where: { user: { id_user: userId } },
    });
    if (!patient) throw new NotFoundException('Dossier patient non trouvé');

    return this.diseaseRepo.find({
      where: { patient: { id_patient: patient.id_patient } },
      order: { diagnosed_at: 'DESC' },
    });
  }

  async create(patientId: number, data: Partial<ChronicDisease>, requestingUser: any) {
    // Patients can only add diseases to their own record
    if (requestingUser.role === UserRole.PATIENT) {
      const patient = await this.patientRepo.findOne({
        where: { user: { id_user: requestingUser.id_user } },
      });
      if (!patient || patient.id_patient !== patientId) {
        throw new ForbiddenException('Accès refusé');
      }
    }

    const patient = await this.patientRepo.findOne({ where: { id_patient: patientId } });
    if (!patient) throw new NotFoundException('Patient non trouvé');

    const disease = this.diseaseRepo.create({
      ...data,
      patient,
    });

    return this.diseaseRepo.save(disease);
  }

  async update(diseaseId: number, data: Partial<ChronicDisease>, requestingUser: any) {
    const disease = await this.diseaseRepo.findOne({
      where: { id_chronic_disease: diseaseId },
      relations: ['patient', 'patient.user'],
    });
    if (!disease) throw new NotFoundException('Maladie chronique non trouvée');

    // Patients can only update their own diseases
    if (requestingUser.role === UserRole.PATIENT) {
      if (disease.patient.user.id_user !== requestingUser.id_user) {
        throw new ForbiddenException('Accès refusé');
      }
    }

    await this.diseaseRepo.update(diseaseId, data);
    return this.diseaseRepo.findOne({ where: { id_chronic_disease: diseaseId } });
  }

  async delete(diseaseId: number, requestingUser: any) {
    const disease = await this.diseaseRepo.findOne({
      where: { id_chronic_disease: diseaseId },
      relations: ['patient', 'patient.user'],
    });
    if (!disease) throw new NotFoundException('Maladie chronique non trouvée');

    // Patients can only delete their own diseases
    if (requestingUser.role === UserRole.PATIENT) {
      if (disease.patient.user.id_user !== requestingUser.id_user) {
        throw new ForbiddenException('Accès refusé');
      }
    }

    await this.diseaseRepo.delete(diseaseId);
    return { message: 'Maladie chronique supprimée' };
  }
}

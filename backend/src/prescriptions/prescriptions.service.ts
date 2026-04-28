import { Injectable, NotFoundException, ForbiddenException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Prescription } from './entities/prescription.entity';
import { Patient } from '../patients/entities/patient.entity';
import { Doctor } from '../doctors/entities/doctor.entity';
import { UserRole } from '../users/entities/user.entity';

@Injectable()
export class PrescriptionsService {
  constructor(
    @InjectRepository(Prescription) private prescriptionRepo: Repository<Prescription>,
    @InjectRepository(Patient) private patientRepo: Repository<Patient>,
    @InjectRepository(Doctor) private doctorRepo: Repository<Doctor>,
  ) {}

  async findByPatient(patientId: number, requestingUser: any): Promise<Prescription[]> {
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

    return this.prescriptionRepo.find({
      where: { patient: { id_patient: patientId } },
      relations: ['doctor'],
      order: { prescribed_on: 'DESC' },
    });
  }

  async create(patientId: number, data: any, requestingUser: any): Promise<Prescription> {
    const patient = await this.patientRepo.findOne({ where: { id_patient: patientId } });
    if (!patient) throw new NotFoundException('Patient non trouvé');

    let doctor: Doctor | null = null;
    if (requestingUser.doctor) {
      doctor = await this.doctorRepo.findOne({
        where: { id_doctor: requestingUser.doctor.id_doctor },
      });
    }

    const prescription = this.prescriptionRepo.create({
      ...data,
      patient,
      doctor,
      prescribed_on: data.prescribed_on || new Date().toISOString().split('T')[0],
    });
    return await this.prescriptionRepo.save(prescription) as unknown as Prescription;
  }

  async update(id: number, data: any): Promise<Prescription | null> {
    const prescription = await this.prescriptionRepo.findOne({ where: { id_prescription: id } });
    if (!prescription) throw new NotFoundException('Ordonnance non trouvée');
    await this.prescriptionRepo.update(id, data);
    return this.prescriptionRepo.findOne({ where: { id_prescription: id }, relations: ['doctor'] });
  }

  async delete(id: number): Promise<{ message: string }> {
    const prescription = await this.prescriptionRepo.findOne({ where: { id_prescription: id } });
    if (!prescription) throw new NotFoundException('Ordonnance non trouvée');
    await this.prescriptionRepo.delete(id);
    return { message: 'Ordonnance supprimée' };
  }
}

import { Injectable, NotFoundException, ForbiddenException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { MedicalRecord } from './entities/medical-record.entity';
import { Patient } from '../patients/entities/patient.entity';
import { UserRole } from '../users/entities/user.entity';

@Injectable()
export class MedicalRecordsService {
  constructor(
    @InjectRepository(MedicalRecord) private recordRepo: Repository<MedicalRecord>,
    @InjectRepository(Patient) private patientRepo: Repository<Patient>,
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

    return this.recordRepo.find({
      where: { patient: { id_patient: patientId } },
      order: { created_at: 'DESC' },
    });
  }

  async create(patientId: number, data: any, requestingUser: any) {
    const patient = await this.patientRepo.findOne({ where: { id_patient: patientId } });
    if (!patient) throw new NotFoundException('Patient non trouvé');

    const record = this.recordRepo.create({
      ...data,
      patient,
      doctor_name: requestingUser.doctor
        ? `Dr. ${requestingUser.doctor.first_name} ${requestingUser.doctor.last_name}`
        : data.doctor_name,
    });
    return this.recordRepo.save(record);
  }

  async update(id: number, data: any) {
    const record = await this.recordRepo.findOne({ where: { id_record: id } });
    if (!record) throw new NotFoundException('Dossier médical non trouvé');
    await this.recordRepo.update(id, data);
    return this.recordRepo.findOne({ where: { id_record: id } });
  }
}

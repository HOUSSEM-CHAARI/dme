import { Injectable, NotFoundException, ForbiddenException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, Like } from 'typeorm';
import { Patient } from './entities/patient.entity';
import { UserRole } from '../users/entities/user.entity';

@Injectable()
export class PatientsService {
  constructor(
    @InjectRepository(Patient) private patientRepo: Repository<Patient>,
  ) {}

  async findAll(search?: string) {
    if (search) {
      return this.patientRepo.find({
        where: [
          { first_name: Like(`%${search}%`) },
          { last_name: Like(`%${search}%`) },
          { phone_number: Like(`%${search}%`) },
        ],
        relations: ['user'],
        order: { last_name: 'ASC' },
      });
    }
    return this.patientRepo.find({
      relations: ['user'],
      order: { last_name: 'ASC' },
    });
  }

  async create(data: Partial<Patient>) {
    const patient = this.patientRepo.create(data);
    return this.patientRepo.save(patient);
  }

  async findOne(id: number, requestingUser: any) {
    const patient = await this.patientRepo.findOne({
      where: { id_patient: id },
      relations: ['user', 'medical_records', 'prescriptions', 'analyses', 'documents'],
    });
    if (!patient) throw new NotFoundException('Patient non trouvé');

    // Patients can only see their own record
    if (
      requestingUser.role === UserRole.PATIENT &&
      patient.user?.id_user !== requestingUser.id_user
    ) {
      throw new ForbiddenException('Accès refusé');
    }

    return patient;
  }

  async findByUserId(userId: number) {
    const patient = await this.patientRepo.findOne({
      where: { user: { id_user: userId } },
      relations: ['medical_records', 'prescriptions', 'analyses', 'documents'],
    });
    if (!patient) throw new NotFoundException('Dossier patient non trouvé');
    return patient;
  }

  async update(id: number, data: Partial<Patient>) {
    await this.patientRepo.update(id, data);
    return this.patientRepo.findOne({ where: { id_patient: id } });
  }
}

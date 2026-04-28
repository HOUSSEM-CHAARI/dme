import { Injectable, NotFoundException, ForbiddenException, ConflictException, BadRequestException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, Like, DataSource } from 'typeorm';
import * as bcrypt from 'bcryptjs';
import { Patient } from './entities/patient.entity';
import { User, UserRole } from '../users/entities/user.entity';

@Injectable()
export class PatientsService {
  constructor(
    @InjectRepository(Patient) private patientRepo: Repository<Patient>,
    @InjectRepository(User) private userRepo: Repository<User>,
    private dataSource: DataSource,
  ) {}

  async findAll(search?: string) {
    if (search) {
      return this.patientRepo.find({
        where: [
          { first_name: Like(`%${search}%`) },
          { last_name: Like(`%${search}%`) },
          { phone_number: Like(`%${search}%`) },
          { cin: Like(`%${search}%`) },
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

  async create(data: any) {
    // If email is provided, create user account along with patient
    if (data.email) {
      const existing = await this.userRepo.findOne({ where: { email: data.email } });
      if (existing) {
        throw new ConflictException('Un compte avec cet email existe déjà');
      }

      const queryRunner = this.dataSource.createQueryRunner();
      await queryRunner.connect();
      await queryRunner.startTransaction();

      try {
        // Create user
        const password = data.password || 'Password123!'; // Default password
        const hash = await bcrypt.hash(password, 12);
        const user = queryRunner.manager.create(User, {
          email: data.email,
          password_hash: hash,
          role: UserRole.PATIENT,
        });
        await queryRunner.manager.save(user);

        // Create patient profile
        const patient = queryRunner.manager.create(Patient, {
          first_name: data.first_name,
          last_name: data.last_name,
          dob: data.dob,
          phone_number: data.phone_number,
          address: data.address,
          blood_type: data.blood_type,
          allergies: data.allergies,
          chronic_diseases: data.chronic_diseases,
          cin: data.cin,
          gender: data.gender,
          emergency_contact: data.emergency_contact,
          emergency_contact_phone: data.emergency_contact_phone,
          user,
        });
        await queryRunner.manager.save(patient);

        await queryRunner.commitTransaction();
        return patient;
      } catch (err) {
        await queryRunner.rollbackTransaction();
        throw err;
      } finally {
        await queryRunner.release();
      }
    }

    // Legacy: create patient without user account
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

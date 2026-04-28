import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './entities/user.entity';
import { Patient } from '../patients/entities/patient.entity';
import { Doctor } from '../doctors/entities/doctor.entity';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User) private userRepo: Repository<User>,
    @InjectRepository(Patient) private patientRepo: Repository<Patient>,
    @InjectRepository(Doctor) private doctorRepo: Repository<Doctor>,
  ) {}

  async getProfile(userId: number) {
    const user = await this.userRepo.findOne({
      where: { id_user: userId },
      relations: ['patient', 'doctor'],
    });
    if (!user) throw new NotFoundException('Utilisateur non trouvé');
    const { password_hash, ...result } = user;
    return result;
  }

  async updateProfile(userId: number, updateData: any) {
    const user = await this.userRepo.findOne({
      where: { id_user: userId },
      relations: ['patient', 'doctor'],
    });
    if (!user) throw new NotFoundException('Utilisateur non trouvé');

    if (user.patient && updateData.patient) {
      await this.patientRepo.update(user.patient.id_patient, updateData.patient);
    }
    if (user.doctor && updateData.doctor) {
      await this.doctorRepo.update(user.doctor.id_doctor, updateData.doctor);
    }
    return this.getProfile(userId);
  }
}

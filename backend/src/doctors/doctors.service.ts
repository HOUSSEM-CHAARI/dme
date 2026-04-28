import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Doctor } from './entities/doctor.entity';

@Injectable()
export class DoctorsService {
  constructor(@InjectRepository(Doctor) private doctorRepo: Repository<Doctor>) {}

  findAll() {
    return this.doctorRepo.find({ relations: ['user'] });
  }

  async findOne(id: number) {
    const doctor = await this.doctorRepo.findOne({ where: { id_doctor: id }, relations: ['user'] });
    if (!doctor) throw new NotFoundException('Médecin non trouvé');
    return doctor;
  }

  async update(id: number, data: Partial<Doctor>) {
    await this.doctorRepo.update(id, data);
    return this.findOne(id);
  }
}

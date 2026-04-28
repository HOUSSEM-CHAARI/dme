import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Document } from './entities/document.entity';
import { Patient } from '../patients/entities/patient.entity';

@Injectable()
export class DocumentsService {
  constructor(
    @InjectRepository(Document) private documentRepo: Repository<Document>,
    @InjectRepository(Patient) private patientRepo: Repository<Patient>,
  ) {}

  async findByPatient(patientId: number) {
    return this.documentRepo.find({
      where: { patient: { id_patient: patientId } },
      order: { date_added: 'DESC' },
    });
  }

  async findOne(id: number) {
    const doc = await this.documentRepo.findOne({
      where: { id_document: id },
      relations: ['patient'],
    });
    if (!doc) throw new NotFoundException('Document non trouvé');
    return doc;
  }

  async create(patientId: number, data: any, requestingUser: any) {
    const patient = await this.patientRepo.findOne({ where: { id_patient: patientId } });
    if (!patient) throw new NotFoundException('Patient non trouvé');

    const doc = this.documentRepo.create({
      ...data,
      patient,
      added_by: requestingUser.doctor
        ? `Dr. ${requestingUser.doctor.first_name} ${requestingUser.doctor.last_name}`
        : requestingUser.email,
    });
    return this.documentRepo.save(doc);
  }

  async delete(id: number) {
    const doc = await this.documentRepo.findOne({ where: { id_document: id } });
    if (!doc) throw new NotFoundException('Document non trouvé');
    await this.documentRepo.delete(id);
    return { message: 'Document supprimé' };
  }
}

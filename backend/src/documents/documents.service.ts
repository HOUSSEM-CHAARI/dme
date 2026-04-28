import { Injectable, NotFoundException, ForbiddenException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Document } from './entities/document.entity';
import { Patient } from '../patients/entities/patient.entity';
import { UserRole } from '../users/entities/user.entity';

@Injectable()
export class DocumentsService {
  constructor(
    @InjectRepository(Document) private documentRepo: Repository<Document>,
    @InjectRepository(Patient) private patientRepo: Repository<Patient>,
  ) {}

  async findByPatient(patientId: number, requestingUser?: any) {
    // If patient role, verify they're accessing their own documents
    if (requestingUser?.role === UserRole.PATIENT) {
      const patient = await this.patientRepo.findOne({
        where: { id_patient: patientId },
        relations: ['user'],
      });
      if (!patient || patient.user.id_user !== requestingUser.id_user) {
        throw new ForbiddenException('Accès refusé');
      }
    }

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
    const patient = await this.patientRepo.findOne({
      where: { id_patient: patientId },
      relations: ['user'],
    });
    if (!patient) throw new NotFoundException('Patient non trouvé');

    // Patients can only upload to their own record
    if (requestingUser.role === UserRole.PATIENT) {
      if (patient.user.id_user !== requestingUser.id_user) {
        throw new ForbiddenException('Vous ne pouvez télécharger que vers votre propre dossier');
      }
    }

    // Determine who added the document
    let addedBy = requestingUser.email;
    if (requestingUser.doctor) {
      addedBy = `Dr. ${requestingUser.doctor.first_name} ${requestingUser.doctor.last_name}`;
    } else if (requestingUser.patient) {
      addedBy = `${requestingUser.patient.first_name} ${requestingUser.patient.last_name} (Patient)`;
    } else if (requestingUser.staff) {
      addedBy = `${requestingUser.staff.first_name} ${requestingUser.staff.last_name} (Staff)`;
    }

    const doc = this.documentRepo.create({
      ...data,
      patient,
      added_by: addedBy,
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

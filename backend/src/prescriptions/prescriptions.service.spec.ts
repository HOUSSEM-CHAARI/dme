import { Test, TestingModule } from '@nestjs/testing';
import { PrescriptionsService } from './prescriptions.service';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Prescription } from './entities/prescription.entity';
import { Patient } from '../patients/entities/patient.entity';
import { Doctor } from '../doctors/entities/doctor.entity';
import { NotFoundException } from '@nestjs/common';
import { UserRole } from '../users/entities/user.entity';

const mockPrescriptionRepo = {
  find: jest.fn(),
  findOne: jest.fn(),
  create: jest.fn(),
  save: jest.fn(),
  update: jest.fn(),
};
const mockPatientRepo = { findOne: jest.fn() };
const mockDoctorRepo = { findOne: jest.fn() };

describe('PrescriptionsService', () => {
  let service: PrescriptionsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        PrescriptionsService,
        { provide: getRepositoryToken(Prescription), useValue: mockPrescriptionRepo },
        { provide: getRepositoryToken(Patient), useValue: mockPatientRepo },
        { provide: getRepositoryToken(Doctor), useValue: mockDoctorRepo },
      ],
    }).compile();
    service = module.get<PrescriptionsService>(PrescriptionsService);
    jest.clearAllMocks();
  });

  it('should return prescriptions for a patient', async () => {
    const patient = { id_patient: 1, user: { id_user: 10 } };
    mockPatientRepo.findOne.mockResolvedValue(patient);
    mockPrescriptionRepo.find.mockResolvedValue([
      { id_prescription: 1, medication: 'Amlodipine 5mg', status: 'active' },
    ]);

    const result = await service.findByPatient(1, { id_user: 10, role: UserRole.PATIENT });
    expect(result).toHaveLength(1);
    expect(result[0].medication).toBe('Amlodipine 5mg');
  });

  it('should create a prescription linked to doctor', async () => {
    const patient = { id_patient: 1 };
    const doctor = { id_doctor: 5 };
    const newPrescription = {
      id_prescription: 99,
      medication: 'Metformine 500mg',
      patient,
      doctor,
      prescribed_on: '2024-05-13',
    };

    mockPatientRepo.findOne.mockResolvedValue(patient);
    mockDoctorRepo.findOne.mockResolvedValue(doctor);
    mockPrescriptionRepo.create.mockReturnValue(newPrescription);
    mockPrescriptionRepo.save.mockResolvedValue(newPrescription);

    const result = await service.create(
      1,
      { medication: 'Metformine 500mg', dosage: '1 comprimé', frequency: '2x/jour' },
      { id_user: 3, role: UserRole.DOCTOR, doctor: { id_doctor: 5 } },
    );

    expect(result.medication).toBe('Metformine 500mg');
    expect(mockPrescriptionRepo.save).toHaveBeenCalled();
  });

  it('should throw NotFoundException when patient not found during create', async () => {
    mockPatientRepo.findOne.mockResolvedValue(null);
    await expect(
      service.create(999, { medication: 'Test' }, { role: UserRole.DOCTOR }),
    ).rejects.toThrow(NotFoundException);
  });
});

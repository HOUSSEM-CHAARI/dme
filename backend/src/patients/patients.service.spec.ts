import { Test, TestingModule } from '@nestjs/testing';
import { PatientsService } from './patients.service';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Patient } from './entities/patient.entity';
import { NotFoundException, ForbiddenException } from '@nestjs/common';
import { UserRole } from '../users/entities/user.entity';

const mockPatientRepo = {
  find: jest.fn(),
  findOne: jest.fn(),
  update: jest.fn(),
};

const mockPatients = [
  { id_patient: 1, first_name: 'Marie', last_name: 'Dupont', dob: '1968-05-12', user: { id_user: 10 } },
  { id_patient: 2, first_name: 'Jean', last_name: 'Martin', dob: '1975-11-23', user: { id_user: 11 } },
];

describe('PatientsService', () => {
  let service: PatientsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        PatientsService,
        { provide: getRepositoryToken(Patient), useValue: mockPatientRepo },
      ],
    }).compile();

    service = module.get<PatientsService>(PatientsService);
    jest.clearAllMocks();
  });

  describe('findAll', () => {
    it('should return all patients without search', async () => {
      mockPatientRepo.find.mockResolvedValue(mockPatients);
      const result = await service.findAll();
      expect(result).toHaveLength(2);
      expect(mockPatientRepo.find).toHaveBeenCalled();
    });

    it('should filter patients by search term', async () => {
      mockPatientRepo.find.mockResolvedValue([mockPatients[0]]);
      const result = await service.findAll('Marie');
      expect(result).toHaveLength(1);
      expect(result[0].first_name).toBe('Marie');
    });
  });

  describe('findOne', () => {
    const doctorUser = { id_user: 1, role: UserRole.DOCTOR };
    const patientUser = { id_user: 10, role: UserRole.PATIENT };
    const otherPatientUser = { id_user: 99, role: UserRole.PATIENT };

    it('should return patient for doctor', async () => {
      mockPatientRepo.findOne.mockResolvedValue(mockPatients[0]);
      const result = await service.findOne(1, doctorUser);
      expect(result.id_patient).toBe(1);
    });

    it('should allow patient to access their own record', async () => {
      mockPatientRepo.findOne.mockResolvedValue(mockPatients[0]);
      const result = await service.findOne(1, patientUser);
      expect(result.id_patient).toBe(1);
    });

    it('should forbid patient from accessing another patient record', async () => {
      mockPatientRepo.findOne.mockResolvedValue(mockPatients[0]);
      await expect(service.findOne(1, otherPatientUser)).rejects.toThrow(ForbiddenException);
    });

    it('should throw NotFoundException if patient does not exist', async () => {
      mockPatientRepo.findOne.mockResolvedValue(null);
      await expect(service.findOne(999, doctorUser)).rejects.toThrow(NotFoundException);
    });
  });
});

import { Test, TestingModule } from '@nestjs/testing';
import { AuthService } from './auth.service';
import { JwtService } from '@nestjs/jwt';
import { getRepositoryToken } from '@nestjs/typeorm';
import { User, UserRole } from '../users/entities/user.entity';
import { Patient } from '../patients/entities/patient.entity';
import { Doctor } from '../doctors/entities/doctor.entity';
import { DataSource } from 'typeorm';
import * as bcrypt from 'bcryptjs';
import { UnauthorizedException, ConflictException } from '@nestjs/common';

const mockUserRepo = {
  findOne: jest.fn(),
  create: jest.fn(),
  save: jest.fn(),
};

const mockPatientRepo = { create: jest.fn(), save: jest.fn() };
const mockDoctorRepo = { create: jest.fn(), save: jest.fn() };

const mockQueryRunner = {
  connect: jest.fn(),
  startTransaction: jest.fn(),
  commitTransaction: jest.fn(),
  rollbackTransaction: jest.fn(),
  release: jest.fn(),
  manager: {
    create: jest.fn(),
    save: jest.fn(),
  },
};

const mockDataSource = {
  createQueryRunner: jest.fn().mockReturnValue(mockQueryRunner),
};

const mockJwtService = {
  sign: jest.fn().mockReturnValue('mock-jwt-token'),
};

describe('AuthService', () => {
  let service: AuthService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        AuthService,
        { provide: getRepositoryToken(User), useValue: mockUserRepo },
        { provide: getRepositoryToken(Patient), useValue: mockPatientRepo },
        { provide: getRepositoryToken(Doctor), useValue: mockDoctorRepo },
        { provide: JwtService, useValue: mockJwtService },
        { provide: DataSource, useValue: mockDataSource },
      ],
    }).compile();

    service = module.get<AuthService>(AuthService);
    jest.clearAllMocks();
  });

  describe('login', () => {
    it('should return access_token and user on valid credentials', async () => {
      const hash = await bcrypt.hash('password123', 10);
      const mockUser = {
        id_user: 1,
        email: 'doctor@test.com',
        password_hash: hash,
        role: UserRole.DOCTOR,
        doctor: { id_doctor: 1, first_name: 'Martin', last_name: 'Dupont' },
        patient: null,
      };
      mockUserRepo.findOne.mockResolvedValue(mockUser);

      const result = await service.login({ email: 'doctor@test.com', password: 'password123' });

      expect(result.access_token).toBe('mock-jwt-token');
      expect(result.user.role).toBe(UserRole.DOCTOR);
      expect(result.user.email).toBe('doctor@test.com');
    });

    it('should throw UnauthorizedException if user not found', async () => {
      mockUserRepo.findOne.mockResolvedValue(null);
      await expect(
        service.login({ email: 'unknown@test.com', password: 'pass' }),
      ).rejects.toThrow(UnauthorizedException);
    });

    it('should throw UnauthorizedException on wrong password', async () => {
      const hash = await bcrypt.hash('correctpass', 10);
      mockUserRepo.findOne.mockResolvedValue({
        id_user: 1,
        email: 'user@test.com',
        password_hash: hash,
        role: UserRole.PATIENT,
        patient: null,
        doctor: null,
      });
      await expect(
        service.login({ email: 'user@test.com', password: 'wrongpass' }),
      ).rejects.toThrow(UnauthorizedException);
    });
  });

  describe('signup', () => {
    it('should throw ConflictException if email already exists', async () => {
      mockUserRepo.findOne.mockResolvedValue({ id_user: 1, email: 'taken@test.com' });
      await expect(
        service.signup({
          email: 'taken@test.com',
          password: 'password123',
          role: UserRole.PATIENT,
          first_name: 'Test',
          last_name: 'User',
        }),
      ).rejects.toThrow(ConflictException);
    });

    it('should create patient user successfully', async () => {
      mockUserRepo.findOne
        .mockResolvedValueOnce(null)
        .mockResolvedValueOnce({
          id_user: 2,
          email: 'newpatient@test.com',
          role: UserRole.PATIENT,
          patient: { id_patient: 1, first_name: 'New', last_name: 'Patient' },
          doctor: null,
        });

      const savedUser = { id_user: 2, email: 'newpatient@test.com', role: UserRole.PATIENT };
      mockQueryRunner.manager.create.mockReturnValue(savedUser);
      mockQueryRunner.manager.save.mockResolvedValue(savedUser);

      const result = await service.signup({
        email: 'newpatient@test.com',
        password: 'securepass123',
        role: UserRole.PATIENT,
        first_name: 'New',
        last_name: 'Patient',
      });

      expect(result.access_token).toBe('mock-jwt-token');
      expect(mockQueryRunner.commitTransaction).toHaveBeenCalled();
    });

    it('should rollback transaction on error', async () => {
      mockUserRepo.findOne.mockResolvedValueOnce(null);
      mockQueryRunner.manager.create.mockReturnValue({});
      mockQueryRunner.manager.save.mockRejectedValue(new Error('DB error'));

      await expect(
        service.signup({
          email: 'error@test.com',
          password: 'password123',
          role: UserRole.PATIENT,
          first_name: 'Test',
          last_name: 'User',
        }),
      ).rejects.toThrow('DB error');
      expect(mockQueryRunner.rollbackTransaction).toHaveBeenCalled();
    });
  });
});

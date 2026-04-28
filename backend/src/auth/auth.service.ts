import {
  Injectable,
  UnauthorizedException,
  ConflictException,
  BadRequestException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, DataSource } from 'typeorm';
import * as bcrypt from 'bcryptjs';
import { User, UserRole } from '../users/entities/user.entity';
import { Patient } from '../patients/entities/patient.entity';
import { Doctor } from '../doctors/entities/doctor.entity';
import { LoginDto, SignupDto } from './dto/auth.dto';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(User) private userRepo: Repository<User>,
    @InjectRepository(Patient) private patientRepo: Repository<Patient>,
    @InjectRepository(Doctor) private doctorRepo: Repository<Doctor>,
    private jwtService: JwtService,
    private dataSource: DataSource,
  ) {}

  async login(dto: LoginDto) {
    const user = await this.userRepo.findOne({
      where: { email: dto.email },
      relations: ['patient', 'doctor'],
    });
    if (!user) throw new UnauthorizedException('Email ou mot de passe incorrect');

    const isValid = await bcrypt.compare(dto.password, user.password_hash);
    if (!isValid) throw new UnauthorizedException('Email ou mot de passe incorrect');

    const payload = { sub: user.id_user, email: user.email, role: user.role };
    const token = this.jwtService.sign(payload);

    return {
      access_token: token,
      user: this.buildUserResponse(user),
    };
  }

  async signup(dto: SignupDto) {
    const existing = await this.userRepo.findOne({ where: { email: dto.email } });
    if (existing) throw new ConflictException('Cet email est déjà utilisé');

    const queryRunner = this.dataSource.createQueryRunner();
    await queryRunner.connect();
    await queryRunner.startTransaction();

    try {
      const hash = await bcrypt.hash(dto.password, 12);
      const user = queryRunner.manager.create(User, {
        email: dto.email,
        password_hash: hash,
        role: dto.role,
      });
      await queryRunner.manager.save(user);

      if (dto.role === UserRole.PATIENT) {
        const patient = queryRunner.manager.create(Patient, {
          first_name: dto.first_name,
          last_name: dto.last_name,
          dob: dto.dob,
          phone_number: dto.phone_number,
          address: dto.address,
          user,
        });
        await queryRunner.manager.save(patient);
      } else if (dto.role === UserRole.DOCTOR) {
        const doctor = queryRunner.manager.create(Doctor, {
          first_name: dto.first_name,
          last_name: dto.last_name,
          specialization: dto.specialization,
          license_number: dto.license_number,
          hospital_affiliation: dto.hospital_affiliation,
          user,
        });
        await queryRunner.manager.save(doctor);
      }

      await queryRunner.commitTransaction();

      const savedUser = await this.userRepo.findOne({
        where: { id_user: user.id_user },
        relations: ['patient', 'doctor'],
      });

      const payload = { sub: savedUser.id_user, email: savedUser.email, role: savedUser.role };
      const token = this.jwtService.sign(payload);

      return {
        access_token: token,
        user: this.buildUserResponse(savedUser),
      };
    } catch (err) {
      await queryRunner.rollbackTransaction();
      throw err;
    } finally {
      await queryRunner.release();
    }
  }

  private buildUserResponse(user: User) {
    const base = {
      id: user.id_user,
      email: user.email,
      role: user.role,
    };
    if (user.role === UserRole.PATIENT && user.patient) {
      return {
        ...base,
        name: `${user.patient.first_name} ${user.patient.last_name}`,
        patientId: user.patient.id_patient,
      };
    }
    if (user.role === UserRole.DOCTOR && user.doctor) {
      return {
        ...base,
        name: `Dr. ${user.doctor.first_name} ${user.doctor.last_name}`,
        doctorId: user.doctor.id_doctor,
        specialization: user.doctor.specialization,
      };
    }
    return { ...base, name: user.email.split('@')[0] };
  }
}

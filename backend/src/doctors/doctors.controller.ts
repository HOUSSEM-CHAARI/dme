import { Controller, Get, Put, Param, Body, UseGuards, ParseIntPipe } from '@nestjs/common';
import { DoctorsService } from './doctors.service';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { RolesGuard } from '../auth/guards/roles.guard';
import { Roles } from '../auth/decorators/roles.decorator';
import { UserRole } from '../users/entities/user.entity';

@Controller('doctors')
@UseGuards(JwtAuthGuard, RolesGuard)
export class DoctorsController {
  constructor(private readonly doctorsService: DoctorsService) {}

  @Get()
  @Roles(UserRole.STAFF, UserRole.PATIENT)
  findAll() {
    return this.doctorsService.findAll();
  }

  @Get(':id')
  @Roles(UserRole.DOCTOR, UserRole.STAFF, UserRole.PATIENT)
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.doctorsService.findOne(id);
  }

  @Put(':id')
  @Roles(UserRole.DOCTOR)
  update(@Param('id', ParseIntPipe) id: number, @Body() body: any) {
    return this.doctorsService.update(id, body);
  }
}

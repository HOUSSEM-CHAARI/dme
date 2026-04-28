import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Body,
  Param,
  UseGuards,
  Req,
  ParseIntPipe,
} from '@nestjs/common';
import { ChronicDiseasesService } from './chronic-diseases.service';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { RolesGuard } from '../auth/guards/roles.guard';
import { Roles } from '../auth/decorators/roles.decorator';
import { UserRole } from '../users/entities/user.entity';

@Controller('chronic-diseases')
@UseGuards(JwtAuthGuard, RolesGuard)
export class ChronicDiseasesController {
  constructor(private readonly chronicDiseasesService: ChronicDiseasesService) {}

  // Get my chronic diseases (patient only)
  @Get('my')
  @Roles(UserRole.PATIENT)
  getMyDiseases(@Req() req: any) {
    return this.chronicDiseasesService.findMyDiseases(req.user.id_user);
  }

  // Get chronic diseases for a patient
  @Get('patient/:patientId')
  @Roles(UserRole.DOCTOR, UserRole.STAFF, UserRole.PATIENT)
  getByPatient(@Param('patientId', ParseIntPipe) patientId: number, @Req() req: any) {
    return this.chronicDiseasesService.findByPatient(patientId, req.user);
  }

  // Add chronic disease for a patient
  @Post('patient/:patientId')
  @Roles(UserRole.DOCTOR, UserRole.STAFF, UserRole.PATIENT)
  create(
    @Param('patientId', ParseIntPipe) patientId: number,
    @Body() body: any,
    @Req() req: any,
  ) {
    return this.chronicDiseasesService.create(patientId, body, req.user);
  }

  // Update a chronic disease
  @Put(':id')
  @Roles(UserRole.DOCTOR, UserRole.STAFF, UserRole.PATIENT)
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() body: any,
    @Req() req: any,
  ) {
    return this.chronicDiseasesService.update(id, body, req.user);
  }

  // Delete a chronic disease
  @Delete(':id')
  @Roles(UserRole.DOCTOR, UserRole.STAFF, UserRole.PATIENT)
  delete(@Param('id', ParseIntPipe) id: number, @Req() req: any) {
    return this.chronicDiseasesService.delete(id, req.user);
  }
}

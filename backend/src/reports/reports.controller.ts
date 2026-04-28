import { Controller, Get, Query, Param, UseGuards, ParseIntPipe } from '@nestjs/common';
import { ReportsService } from './reports.service';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { RolesGuard } from '../auth/guards/roles.guard';
import { Roles } from '../auth/decorators/roles.decorator';
import { UserRole } from '../users/entities/user.entity';

@Controller('reports')
@UseGuards(JwtAuthGuard, RolesGuard)
export class ReportsController {
  constructor(private readonly reportsService: ReportsService) {}

  @Get('stats')
  @Roles(UserRole.DOCTOR, UserRole.STAFF)
  getStats() {
    return this.reportsService.getDashboardStats();
  }

  @Get('patient/:id')
  @Roles(UserRole.DOCTOR, UserRole.STAFF, UserRole.PATIENT)
  getPatientReport(
    @Param('id', ParseIntPipe) id: number,
    @Query('type') type: string = 'full',
    @Query('startDate') startDate?: string,
    @Query('endDate') endDate?: string,
  ) {
    return this.reportsService.generatePatientReport(id, type, startDate, endDate);
  }
}

import { Controller, Get, Put, Body, Req, UseGuards } from '@nestjs/common';
import { UsersService } from './users.service';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';

@Controller('users')
@UseGuards(JwtAuthGuard)
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get('me')
  getProfile(@Req() req: any) {
    return this.usersService.getProfile(req.user.id_user);
  }

  @Put('me')
  updateProfile(@Req() req: any, @Body() body: any) {
    return this.usersService.updateProfile(req.user.id_user, body);
  }
}

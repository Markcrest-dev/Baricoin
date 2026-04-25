import { Controller, Get, Patch, Body, UseGuards, Request } from '@nestjs/common';
import { UserService } from './user.service';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';

@Controller('users')
@UseGuards(JwtAuthGuard)
export class UserController {
  constructor(private userService: UserService) {}

  @Get('profile')
  async getProfile(@Request() req: any) {
    return this.userService.findOne(req.user.userId);
  }

  @Patch('profile')
  async updateProfile(@Request() req: any, @Body() body: any) {
    return this.userService.update(req.user.userId, body);
  }
}

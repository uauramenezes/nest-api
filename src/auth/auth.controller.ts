import { AuthService } from './auth.service';
import { JwtAuthGuard } from './guards/jwt-auth.guard';
import { LocalAuthGuard } from './guards/local-auth.guard';
import {
  Controller,
  Request,
  Post,
  UseGuards,
  Get,
  Delete,
  Body,
} from '@nestjs/common';
import { User } from 'src/users/users.entity';

@Controller()
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('create')
  create(@Body() user: User) {
    return this.authService.createUser(user);
  }

  @UseGuards(LocalAuthGuard)
  @Post('login')
  async login(@Request() req) {
    return this.authService.login(req.user);
  }

  @UseGuards(JwtAuthGuard)
  @Get('profile')
  getUser(@Request() req) {
    return req.user;
  }

  @UseGuards(JwtAuthGuard)
  @Delete('delete')
  delete(@Request() req) {
    return this.authService.delete(req.user);
  }
}

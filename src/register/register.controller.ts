import { Body, Controller, Post } from '@nestjs/common';
import { User } from './user.interface';
import { RegisterService } from './register.service';

@Controller('register')
export class RegisterController {
  constructor(private registerService: RegisterService) {}

  @Post()
  register(@Body() userData: User) {
    return this.registerService.register(userData);
  }
}

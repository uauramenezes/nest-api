import { Injectable } from '@nestjs/common';
import { User } from './user.interface';

@Injectable()
export class RegisterService {
  register(userData: User) {
    return userData;
  }
}

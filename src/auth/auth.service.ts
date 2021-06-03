import { JwtService } from '@nestjs/jwt';
import {
  Injectable,
  ForbiddenException,
  BadRequestException,
  NotFoundException,
} from '@nestjs/common';
import isEmail from 'validator/lib/isEmail';
import isAlpha from 'validator/lib/isAlpha';
import isStrongPassword from 'validator/lib/isStrongPassword';

import { User } from 'src/users/users.entity';
import { UsersService } from 'src/users/users.service';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
  ) {}

  async createUser(reqUser: User) {
    const result = await this.validateData(reqUser);
    if (!result) return result;

    const newUser = await this.usersService.create(reqUser);
    const payload = {
      id: newUser.id,
      name: newUser.name,
      email: newUser.email,
    };

    return {
      access_token: this.jwtService.sign(payload),
    };
  }

  async validateData(user: User) {
    const result = await this.usersService.findOne(user.email);
    if (result) throw new ForbiddenException('Email already in use!');

    if (!isAlpha(user.name)) throw new BadRequestException('Invalid name');
    if (!isEmail(user.email)) throw new BadRequestException('Invalid email');
    if (!isStrongPassword(user.password))
      throw new BadRequestException('Weak password!');

    return true;
  }

  async validateUser(email: string, password: string): Promise<any> {
    const user = await this.usersService.findOne(email);

    if (user && user.password === password) return user;
    if (!user) return { error: 'User not found!' };
    return { error: 'Invalid password' };
  }

  async login(user: User) {
    const payload = {
      id: user.id,
      name: user.name,
      email: user.email,
    };

    return {
      access_token: this.jwtService.sign(payload),
    };
  }

  async delete(user: User) {
    const result = await this.usersService.delete(user.id);
    if (result.affected > 0) return { ok: 'Done' };
    throw new NotFoundException();
  }
}

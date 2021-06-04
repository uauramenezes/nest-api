import isStrongPassword from 'validator/lib/isStrongPassword';
import isEmail from 'validator/lib/isEmail';
import isAlpha from 'validator/lib/isAlpha';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import {
  Injectable,
  ForbiddenException,
  BadRequestException,
  NotFoundException,
} from '@nestjs/common';

import { User } from 'src/users/users.entity';
import { UsersService } from 'src/users/users.service';
import { UserDto } from 'src/users/dto/user.dto';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
  ) {}

  async createUser(reqUser: UserDto) {
    const result = await this.validateUserData(reqUser);
    if (!result) return result;

    reqUser.password = await bcrypt.hash(reqUser.password, 10);

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

  async validateUserData(user: UserDto) {
    const result = await this.usersService.findOne(user.email);
    if (result) throw new ForbiddenException('Email already in use!');

    if (!isAlpha(user.name)) throw new BadRequestException('Invalid name');
    if (!isEmail(user.email)) throw new BadRequestException('Invalid email');
    if (!isStrongPassword(user.password))
      throw new BadRequestException('Weak password!');

    return true;
  }

  async validateUser(email: string, password: string): Promise<User | number> {
    const user = await this.usersService.findOne(email);
    const match = await bcrypt.compare(password, user.password);

    if (user && match) return user;
    if (!user) return 404;
    return 401;
  }
}

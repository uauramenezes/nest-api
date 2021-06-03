import { InjectRepository } from '@nestjs/typeorm';
import { Injectable } from '@nestjs/common';
import { DeleteResult, Repository } from 'typeorm';

import { UserDto } from './dto/user.dto';
import { User } from './users.entity';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,
  ) {}

  create(userDto: UserDto): Promise<User> {
    return this.usersRepository.save(userDto);
  }

  findOne(email: string): Promise<User> {
    return this.usersRepository.findOne({ where: { email: email } });
  }

  delete(id: string): Promise<DeleteResult> {
    return this.usersRepository.delete(id);
  }
}

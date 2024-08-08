import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './user.entity';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private readonly usersRepository: Repository<User>,
  ) {}

  async findOneByEmail(email: string): Promise<User | undefined> {
    return this.usersRepository.findOne({
      where: { email },
    });
  }

  async findOneById(id: number): Promise<User | undefined> {
    return this.usersRepository.findOne({
      where: { id },
    });
  }

  async create(user: Partial<User>): Promise<User> {
    return this.usersRepository.save(user);
  }
}

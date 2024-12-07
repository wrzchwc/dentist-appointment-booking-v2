import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UserEntity } from '../domain/user.entity';
import { Repository } from 'typeorm';
import { User } from '../domain/user.model';
import { CreateUserConfig } from '../domain/create-user-config';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(UserEntity)
    private readonly userRepository: Repository<User>
  ) {
  }

  getUserProfile(userId: string): Promise<User | null> {
    return this.userRepository.findOneBy({ id: userId });
  }

  createUser(config: CreateUserConfig): Promise<CreateUserConfig & User> {
    return this.userRepository.save(config);
  }
}

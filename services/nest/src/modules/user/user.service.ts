import { Injectable } from '@nestjs/common';
import { UserRepository } from './user.repository';
import { userType } from '../../models/user/user.types';
import { DeepPartial } from '../../models/utility.types';
import { User } from '@prisma/client';
import BuildPerson from '../../utils/BuildPerson/BuildPerson';

@Injectable()
export class UserService {
  constructor(private userRepository: UserRepository) {}
  async findAll(): Promise<User[]> {
    return await this.userRepository.findAll();
  }

  async findById(id: string): Promise<User> {
    return await this.userRepository.findById(id);
  }

  async create(body: any): Promise<User> {
    return await this.userRepository.create(body);
  }

  async createRandomUser(): Promise<User> {
    const randomUser = new BuildPerson().randomize().build();
    return await this.userRepository.createRandomUser(...randomUser);
  }

  async delete(id: string): Promise<User> {
    return await this.userRepository.delete(id);
  }

  async update(id: string, body: DeepPartial<userType>): Promise<User> {
    return await this.userRepository.update(id, body);
  }
}

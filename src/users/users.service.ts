import { Injectable, ForbiddenException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './user.entity';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,
  ) {}

  async findAll(user: any): Promise<User[]> {
    if (user.role !== 'admin') {
      throw new ForbiddenException('Only admins can access this resource');
    }
    return this.usersRepository.find();
  }

  async updateRole(id: number, role: string, user: any): Promise<User> {
    if (user.role !== 'admin') {
      throw new ForbiddenException('Only admins can update roles');
    }
    const userToUpdate = await this.usersRepository.findOne({ where: { id } });
    userToUpdate.role = role;
    return this.usersRepository.save(userToUpdate);
  }
}

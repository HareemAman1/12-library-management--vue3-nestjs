import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from '../entities/auth.entity';
import * as bcrypt from 'bcrypt';

@Injectable()
export class DashboardService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}

  // GET USERS 
  async getUsers() {
    try {
      return await this.userRepository.find();
    } catch (error) {
      throw new Error(`Error fetching users: ${error.message}`);
    }
  }

  // DELETE USER 
  async deleteUser(id: string) {
    try {
      const result = await this.userRepository.delete(id);
      if (result.affected === 0) {
        throw new Error('User not found');
      }
      return { id }; 
    } catch (error) {
      throw new Error(`Error deleting user: ${error.message}`);
    }
  }

  // GET USER BY ID 
  async getUserById(id: string) {
    try {
      const user = await this.userRepository.findOne({
        where: { id: Number(id) },
        select: ['id', 'username', 'email', 'roles'], 
      });

      if (!user) {
        throw new NotFoundException('User not found');
      }

      return user;
    } catch (error) {
      throw new Error(`Error fetching user by ID: ${error.message}`);
    }}
    
  // UPDATE USER 
  async updateUser(id: string, updateData: { username?: string; email?: string; password?: string; roles?: string }) {
    const user = await this.userRepository.findOneBy({ id: Number(id) });
    if (!user) {
      throw new Error('User not found');
    }

    if (updateData.username) user.username = updateData.username;
    if (updateData.email) user.email = updateData.email;
    if (updateData.password) user.password = await bcrypt.hash(updateData.password, 10);
    if (updateData.roles) user.roles = updateData.roles;

    try {
      await this.userRepository.save(user);
      return user;
    } catch (error) {
      throw new Error(`Error updating user: ${error.message}`);
    }
  }
}

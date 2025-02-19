import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UserEntity } from './entities/user.entity';

@Injectable()
export class AdminService {
  constructor(
    @InjectRepository(UserEntity)
    private readonly userRepository: Repository<UserEntity>,
  ) {}

  async createSuperUser(email: string, password: string): Promise<void> {
    const existingUser = await this.userRepository.findOne({
      where: { email },
    });
    if (existingUser) {
      console.log('User already exists.');
      return;
    }

    const user = new UserEntity();
    user.email = email;
    user.password = password;
    user.isSuperuser = true;

    await user.setPassword(password); // Use the method to hash the password
    await this.userRepository.save(user);
    console.log('Superuser created successfully!');
  }
}

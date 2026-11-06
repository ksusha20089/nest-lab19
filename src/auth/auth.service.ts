import { Injectable, ConflictException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from '../users/entities/user.entity';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
    private jwtService: JwtService,
  ) {}

  async register(username: string, email: string, password: string): Promise<User> {
    const existingUser = await this.userRepository.findOneBy({ email });
    if (existingUser) {
      throw new ConflictException('User with this email already exists');
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const user = this.userRepository.create({
      username,
      email,
      password: hashedPassword,
    });
    return this.userRepository.save(user);
  }

  async validateUser(email: string, pass: string): Promise<any> {
    // Загружаем юзера вместе с ролями
    const user = await this.userRepository.findOne({ 
      where: { email },
      relations: { roles: true } 
    });
    
    if (user && (await bcrypt.compare(pass, user.password))) {
      const { password, ...result } = user;
      return result;
    }
    return null;
  }

  async login(user: any) {
    // Извлекаем названия ролей в массив строк (например, ['administrator'])
    const roles = user.roles ? user.roles.map((r: any) => r.name) : [];
    
    const payload = { 
      username: user.username, 
      sub: user.id, 
      roles: roles 
    };
    
    return {
      access_token: this.jwtService.sign(payload),
    };
  }
}
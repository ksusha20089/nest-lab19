import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from '../users/entities/user.entity';
import { PassportModule } from '@nestjs/passport';
import { LocalStrategy } from './local.strategy';
import { JwtModule } from '@nestjs/jwt'; // <-- Импорт
import { JwtStrategy } from './jwt.strategy'; // <-- Импорт

@Module({
  imports: [
    TypeOrmModule.forFeature([User]),
    PassportModule,
    JwtModule.register({
      secret: 'SECRET_KEY', // В реальном проекте выносится в .env
      signOptions: { expiresIn: '1h' }, // Токен живет 1 час
    }),
  ],
  providers: [AuthService, LocalStrategy, JwtStrategy], // <-- Добавили JwtStrategy
  controllers: [AuthController],
})
export class AuthModule {}
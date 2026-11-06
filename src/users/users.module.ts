import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { Role } from './entities/role.entity'; // <-- Импорт
import { UsersService } from './users.service';

@Module({
  imports: [TypeOrmModule.forFeature([User, Role])], // <-- Добавили Role
  providers: [UsersService],
  exports: [UsersService],
})
export class UsersModule {}
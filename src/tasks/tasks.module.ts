import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TasksService } from './tasks.service';
import { TasksController } from './tasks.controller';
import { Task } from './entities/task.entity';
import { User } from '../users/entities/user.entity'; // Импорт User
import { UsersModule } from '../users/users.module'; // Импорт UsersModule

@Module({
  imports: [
    // ОБЯЗАТЕЛЬНО добавляем User сюда:
    TypeOrmModule.forFeature([Task, User]), 
    UsersModule,
  ],
  controllers: [TasksController],
  providers: [TasksService],
})
export class TasksModule {}
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config';
import { TasksModule } from './tasks/tasks.module';
import { UsersModule } from './users/users.module';
import { AuthModule } from './auth/auth.module';
import { User } from './users/entities/user.entity';
import { Role } from './users/entities/role.entity';
import { Task } from './tasks/entities/task.entity';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    TypeOrmModule.forRoot({
      type: 'postgres',
      // Если есть DATABASE_URL (как на Render), используем её. 
      // Иначе (локально) используем старые настройки.
      url: process.env.DATABASE_URL || undefined,
      host: process.env.DATABASE_URL ? undefined : (process.env.DATABASE_HOST || 'localhost'),
      port: process.env.DATABASE_URL ? undefined : parseInt(process.env.DATABASE_PORT || '5432', 10),
      username: process.env.DATABASE_URL ? undefined : (process.env.DATABASE_USER || 'postgres'),
      password: process.env.DATABASE_URL ? undefined : (process.env.DATABASE_PASSWORD || 'secret'),
      database: process.env.DATABASE_URL ? undefined : (process.env.DATABASE_NAME || 'tasksdb'),
      entities: [User, Role, Task],
      synchronize: true,
      // Render требует SSL для подключения к базе данных
      ssl: process.env.DATABASE_URL ? { rejectUnauthorized: false } : false,
    }),
    TasksModule,
    UsersModule,
    AuthModule,
  ],
})
export class AppModule {}
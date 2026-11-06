import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Task } from './entities/task.entity';
import { User } from '../users/entities/user.entity';

@Injectable()
export class TasksService {
  constructor(
    @InjectRepository(Task)
    private taskRepository: Repository<Task>,
    @InjectRepository(User)
    private userRepository: Repository<User>,
  ) {}

  // --- Базовые методы (Задание 1) ---
  create(title: string, description?: string): Promise<Task> {
    const task = this.taskRepository.create({ title, description });
    return this.taskRepository.save(task);
  }

  findAll(): Promise<Task[]> {
    return this.taskRepository.find({ relations: { user: true } });
  }

  async findOne(id: number): Promise<Task> {
    const task = await this.taskRepository.findOne({ 
      where: { id },
      relations: { user: true }, // <-- Исправлено для новой версии TypeORM
    });
    if (!task) throw new NotFoundException(`Task #${id} not found`);
    return task;
  }

  async update(id: number, attrs: Partial<Task>): Promise<Task> {
    const task = await this.findOne(id);
    Object.assign(task, attrs);
    return this.taskRepository.save(task);
  }

  async remove(id: number): Promise<void> {
    const task = await this.findOne(id);
    await this.taskRepository.remove(task);
  }

  // --- НОВЫЕ МЕТОДЫ ДЛЯ ЗАДАНИЯ 2 ---
  async createForUser(userId: number, title: string, description?: string): Promise<Task> {
    const user = await this.userRepository.findOneBy({ id: userId });
    if (!user) {
      throw new NotFoundException(`User #${userId} not found`);
    }
    const task = this.taskRepository.create({ title, description, user });
    return this.taskRepository.save(task);
  }

  findByUser(userId: number): Promise<Task[]> {
    return this.taskRepository.find({
      where: { user: { id: userId } },
      relations: { user: true }, // <-- Исправлено для новой версии TypeORM
    });
  }
}
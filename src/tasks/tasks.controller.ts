import { Controller, Get, Post, Put, Delete, Body, Param, ParseIntPipe, UseGuards } from '@nestjs/common';
import { TasksService } from './tasks.service';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';
import { AuthGuard } from '@nestjs/passport';
import { RolesGuard } from '../auth/roles.guard';
import { Roles } from '../auth/roles.decorator';

@Controller('tasks')
export class TasksController {
  constructor(private readonly tasksService: TasksService) {}

  // --- Базовые методы (Задание 1) ---

  // Задание 2: Защищаем получение всех задач
  @UseGuards(AuthGuard('jwt'))
  @Get()
  getAllTasks() {
    return this.tasksService.findAll();
  }

  @UseGuards(AuthGuard('jwt'))
  @Get(':id')
  getTaskById(@Param('id', ParseIntPipe) id: number) {
    return this.tasksService.findOne(id);
  }

  @UseGuards(AuthGuard('jwt'))
  @Post()
  createTask(@Body() taskData: CreateTaskDto) { 
    return this.tasksService.create(taskData.title, taskData.description);
  }

  @UseGuards(AuthGuard('jwt'))
  @Put(':id')
  updateTask(
    @Param('id', ParseIntPipe) id: number,
    @Body() taskData: UpdateTaskDto,
  ) {
    return this.tasksService.update(id, taskData);
  }

  // Задание 3: Применяем ролевой доступ к удалению (только для 'administrator')
  @UseGuards(AuthGuard('jwt'), RolesGuard)
  @Roles('administrator')
  @Delete(':id')
  deleteTask(@Param('id', ParseIntPipe) id: number) {
    return this.tasksService.remove(id);
  }

  // --- МЕТОДЫ ДЛЯ ЗАДАНИЯ 2 (Связь с пользователем) ---
  
  @UseGuards(AuthGuard('jwt'))
  @Post('user/:userId')
  createTaskForUser(
    @Param('userId', ParseIntPipe) userId: number,
    @Body() taskData: CreateTaskDto,
  ) {
    return this.tasksService.createForUser(userId, taskData.title, taskData.description);
  }

  @UseGuards(AuthGuard('jwt'))
  @Get('user/:userId')
  getTasksByUser(@Param('userId', ParseIntPipe) userId: number) {
    return this.tasksService.findByUser(userId);
  }
}
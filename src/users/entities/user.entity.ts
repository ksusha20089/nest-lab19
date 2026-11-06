import { Entity, PrimaryGeneratedColumn, Column, OneToMany, ManyToMany, JoinTable } from 'typeorm';
import { Task } from '../../tasks/entities/task.entity';
import { Role } from './role.entity'; // <-- 1. Добавили импорт роли

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true })
  username: string;

  @Column({ unique: true })
  email: string;

  @Column()
  password: string;

  @OneToMany(() => Task, (task) => task.user)
  tasks: Task[];

  // 2. ДОБАВЛЯЕМ СВЯЗЬ С РОЛЯМИ ВОТ СЮДА:
  @ManyToMany(() => Role, (role) => role.users)
  @JoinTable() 
  roles: Role[];
}
import { Controller, Get, Post, Body } from '@nestjs/common';
import { NotesService } from './notes.service';

@Controller('notes')
export class NotesController {
  constructor(private readonly notesService: NotesService) {}

  @Get()
  findAll() {
    return this.notesService.findAll();
  }

  @Post()
  create(@Body() note: any) {
    this.notesService.create(note);
    return 'Заметка добавлена';
  }
}
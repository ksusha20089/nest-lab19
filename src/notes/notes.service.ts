import { Injectable } from '@nestjs/common';

@Injectable()
export class NotesService {
  private notes: any[] = [];

  create(note: any) {
    this.notes.push(note);
  }

  findAll() {
    return this.notes;
  }
}
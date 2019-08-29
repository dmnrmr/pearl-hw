import { Injectable } from '@angular/core';
import { Note } from '../models';

@Injectable()
export class NoteStoreService {
  public notes: {
    [key: number]: Note;
  } = {};

  private makeEmptyNote(): Note {
    return {};
  }

  public addNote(): void {
    const id = new Date().getTime();

    this.notes = {
      ...this.notes,
      [id]: this.makeEmptyNote()
    }
  }

  public removeNote(id: string): void {
    delete this.notes[id];
  }

  public removeAllNotes(): void {
    this.notes = {};
  }
}

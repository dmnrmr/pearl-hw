import { Injectable } from '@angular/core';
import { Note, NoteColor, NoteTextValue } from '../models';

@Injectable()
export class NoteStoreService {
  public notes: {
    [key: string]: Note;
  } = {};
  public selectedNoteId: string;

  private makeEmptyNote(): Note {
    return {
      backgroundColor: '#ffffff',
      textColor: '#000000'
    };
  }

  public addNote(): void {
    const id = String(new Date().getTime());

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

  public updateNoteColors({ code, textColor }: NoteColor): void {
    if (!this.selectedNoteId) {
      return;
    }

    const selectedNote = this.notes[this.selectedNoteId];

    this.notes = {
      ...this.notes,
      [this.selectedNoteId]: {
        ...selectedNote,
        backgroundColor: code,
        textColor
      }
    }
  }

  public updateNoteTextValues(value: NoteTextValue, noteId: string): void {
    const selectedNote = this.notes[noteId];

    this.notes = {
      ...this.notes,
      [noteId]: {
        ...selectedNote,
        ...value
      }
    }
  }
}

import { Injectable } from '@angular/core';
import { Note, NoteColor, NoteEntries, NotePosition, NoteTextValue } from '../models';
import { NoteStorageService } from './storage.service';

@Injectable()
export class NoteStoreService {
  public notes: NoteEntries = {};
  public selectedNoteId: string;

  constructor(private storageService: NoteStorageService) { }

  private updateState(currentState: NoteEntries, changes?: any): void {
    this.notes = {
      ...currentState,
      ...changes
    }

    this.storageService.storeNotes(this.notes);
  }

  private makeEmptyNote(): Note {
    return {
      backgroundColor: '#ffffff',
      textColor: '#000000',
      position: {
        x: 0,
        y: 0
      }
    };
  }

  public setInitialState(notes: NoteEntries): void {
    this.notes = notes || {};
  }

  public addNote(): void {
    const id = String(new Date().getTime());

    this.updateState(this.notes, {
      [id]: this.makeEmptyNote()
    });
  }

  public removeNote(id: string): void {
    delete this.notes[id];

    this.updateState(this.notes);
  }

  public removeAllNotes(): void {
    this.updateState({});
  }

  public updateNoteColors({ code, textColor }: NoteColor): void {
    if (!this.selectedNoteId) {
      return;
    }

    const selectedNote = this.notes[this.selectedNoteId];

    this.updateState(this.notes, {
      [this.selectedNoteId]: {
        ...selectedNote,
        backgroundColor: code,
        textColor
      }
    });
  }

  public updateNoteValues(update: NoteTextValue | NotePosition, noteId: string): void {
    const selectedNote = this.notes[noteId];

    this.updateState(this.notes, {
      [noteId]: {
        ...selectedNote,
        ...update
      }
    });
  }
}

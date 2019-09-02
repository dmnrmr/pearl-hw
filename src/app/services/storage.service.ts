import { Injectable } from '@angular/core';
import { NoteEntries } from '../models';

@Injectable()
export class NoteStorageService {
  private localStorageKey = 'hw-homework';

  public storeNotes(notes: NoteEntries): void {
    const notesString = JSON.stringify(notes);

    window.localStorage.setItem(this.localStorageKey, notesString);
  }

  public getNotes(): NoteEntries {
    const notesString = window.localStorage.getItem(this.localStorageKey);

    return JSON.parse(notesString);
  }
}

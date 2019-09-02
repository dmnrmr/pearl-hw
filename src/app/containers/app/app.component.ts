import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { Note, NoteColor, NoteTextValue } from '../../models';
import { NoteStorageService } from '../../services/storage.service';
import { NoteStoreService } from '../../services/store.service';

type NoteEntry = [string, Note];

@Component({
  selector: 'prl-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AppComponent implements OnInit {
  public noteColors: NoteColor[] = [
    {
      id: 'blue',
      code: '#00ccff',
      label: 'Blue',
      textColor: '#000000'
    },
    {
      id: 'yellow',
      code: '#ffe96a',
      label: 'Yellow',
      textColor: '#000000'
    },
    {
      id: 'black',
      code: '#000000',
      label: 'Black',
      textColor: '#ffffff'
    }
  ];

  constructor(
    public storeService: NoteStoreService,
    public storageService: NoteStorageService
  ) { }

  public ngOnInit(): void {
    const notes = this.storageService.getNotes();

    this.storeService.setInitialState(notes);
  }

  public onAddNote(): void {
    this.storeService.addNote();
  }

  public onRemoveNote(id: string): void {
    this.storeService.removeNote(id);
  }

  public onRemoveAllNotes(): void {
    this.storeService.removeAllNotes();
  }

  public onSelectNoteColor(color: NoteColor): void {
    this.storeService.updateNoteColors(color);
  }

  public onNoteSelect(event: MouseEvent, id: string): void {
    event.stopPropagation();

    if (this.storeService.selectedNoteId === id) {
      return;
    }

    this.storeService.selectedNoteId = id;
  }

  public onNoteDeselect(): void {
    this.storeService.selectedNoteId = undefined;
  }

  public onNoteTextValueChange(value: NoteTextValue, noteId: string): void {
    this.storeService.updateNoteTextValues(value, noteId);
  }

  public trackByNoteId(_: number, [id]: NoteEntry): string {
    return id;
  }

  get notes(): NoteEntry[] {
    return Object.entries(this.storeService.notes);
  }

  get hasNotes(): boolean {
    return this.notes.length > 0;
  }

  get isNoteSelected(): boolean {
    return !!this.storeService.selectedNoteId;
  }
}

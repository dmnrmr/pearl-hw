import { ChangeDetectionStrategy, Component } from '@angular/core';
import { Note, NoteColor } from '../../models';
import { NoteStoreService } from '../../services/store.service';

type NoteEntry = [string, Note];

@Component({
  selector: 'prl-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AppComponent {
  public noteColors: NoteColor[] = [
    {
      id: 'blue',
      code: '#00ccff',
      label: 'Blue',
      labelColor: '#000000'
    },
    {
      id: 'yellow',
      code: '#ffe96a',
      label: 'Yellow',
      labelColor: '#000000'
    },
    {
      id: 'black',
      code: '#000000',
      label: 'Black',
      labelColor: '#ffffff'
    }
  ];

  constructor(private storeService: NoteStoreService) { }

  public onAddNote(): void {
    this.storeService.addNote();
  }

  public onRemoveAllNotes(): void {
    this.storeService.removeAllNotes();
  }

  public onSelectNoteColor(colorId: string): void {
    // tslint:disable-next-line
    console.log('** Select color', colorId);
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
}

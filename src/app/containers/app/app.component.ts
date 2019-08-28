import { Component, ChangeDetectionStrategy } from '@angular/core';
import { NoteColor } from '../../models';

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

  public onAddNote(): void {
    // tslint:disable-next-line
    console.log('** Add note');
  }

  public onRemoveAllNotes(): void {
    // tslint:disable-next-line
    console.log('** Remove all notes');
  }

  public onSelectNoteColor(colorId: string): void {
    // tslint:disable-next-line
    console.log('** Select color', colorId);
  }
}

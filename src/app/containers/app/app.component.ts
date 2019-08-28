import { Component, ChangeDetectionStrategy } from '@angular/core';

@Component({
  selector: 'prl-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AppComponent {
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

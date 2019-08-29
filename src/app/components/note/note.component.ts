import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { Note } from '../../models';

@Component({
  selector: 'prl-note',
  styleUrls: ['note.component.scss'],
  templateUrl: 'note.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class NoteComponent {
  @Input() public note: Note;
}

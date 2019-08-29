import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output } from '@angular/core';
import { NoteColor } from '../../models';

@Component({
  selector: 'prl-header',
  styleUrls: ['header.component.scss'],
  templateUrl: 'header.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class HeaderComponent {
  @Output() private handleAddNote = new EventEmitter<void>();
  @Output() private handleRemoveAllNotes = new EventEmitter<void>();
  @Output() private handleSelectNoteColor = new EventEmitter<NoteColor>();

  @Input() public numberOfNotes: number = 0;
  @Input() public noteColors: NoteColor[] = [];
  @Input() public isColorSelectorEnabled: boolean;

  public onAddNote(): void {
    this.handleAddNote.emit();
  }

  public onRemoveAllNotes(): void {
    this.handleRemoveAllNotes.emit();
  }

  public onSelectNoteColor(color: NoteColor): void {
    this.handleSelectNoteColor.emit(color);
  }
}

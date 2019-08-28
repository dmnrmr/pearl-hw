import { ChangeDetectionStrategy, Component, Input, Output, EventEmitter } from '@angular/core';
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
  @Output() private handleSelectNoteColor = new EventEmitter<string>();

  @Input() public numberOfNotes: number = 0;
  @Input() public noteColors: NoteColor[] = [];

  public onAddNote(): void {
    this.handleAddNote.emit();
  }

  public onRemoveAllNotes(): void {
    this.handleRemoveAllNotes.emit();
  }

  public onSelectNoteColor(colorId: string): void {
    this.handleSelectNoteColor.emit(colorId);
  }
}

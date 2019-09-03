import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { CdkDragEnd } from '@angular/cdk/drag-drop';
import { ChangeDetectionStrategy, Component, EventEmitter, Input, OnDestroy, OnInit, Output } from '@angular/core';
import { AbstractControl, FormGroup } from '@angular/forms';
import { FormId, Note, NotePosition, NoteTextValue } from '../../models';
import { NoteFormService } from '../../services/form.service';

@Component({
  selector: 'prl-note',
  styleUrls: ['note.component.scss'],
  templateUrl: 'note.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class NoteComponent implements OnInit, OnDestroy {
  @Output() private readonly handleRemoveNote = new EventEmitter<void>();
  @Output() private readonly handleNoteTextValueChange = new EventEmitter<NoteTextValue>();
  @Output() private readonly handleNotePositionChange = new EventEmitter<NotePosition>();

  private onDestroy = new Subject();

  @Input() public note: Note;

  public form: FormGroup;
  public FormId = FormId;

  constructor(private formService: NoteFormService) { }

  private onNoteTextValueChange(): void {
    this.form.valueChanges.pipe(
      takeUntil(this.onDestroy)
    )
      .subscribe((value: NoteTextValue) => this.handleNoteTextValueChange.emit(value))
  }

  public ngOnInit(): void {
    const { title, content } = this.note;

    this.form = this.formService.buildForm(title, content);
    this.onNoteTextValueChange();
  }

  public onRemoveNote(): void {
    this.handleRemoveNote.emit();
  }

  public onDragEnded(event: CdkDragEnd): void {
    const position = event.source.getFreeDragPosition();

    this.handleNotePositionChange.emit({ position });
  }

  public ngOnDestroy(): void {
    this.onDestroy.next();
  }

  get titleControl(): AbstractControl {
    return this.form.get(FormId.Title)
  }

  get contentControl(): AbstractControl {
    return this.form.get(FormId.Content)
  }
}

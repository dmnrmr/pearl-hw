import { ChangeDetectionStrategy, Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { AbstractControl, FormGroup } from '@angular/forms';
import { FormId, Note } from '../../models';
import { NoteFormService } from '../../services/form.service';

@Component({
  selector: 'prl-note',
  styleUrls: ['note.component.scss'],
  templateUrl: 'note.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class NoteComponent implements OnInit {
  @Output() private readonly handleRemoveNote = new EventEmitter<void>();

  @Input() public note: Note;

  public form: FormGroup;
  public FormId = FormId;

  constructor(private formService: NoteFormService) { }

  public ngOnInit(): void {
    this.form = this.formService.buildForm();
  }

  public onRemoveNote(): void {
    this.handleRemoveNote.emit();
  }

  get titleControl(): AbstractControl {
    return this.form.get(FormId.Title)
  }

  get contentControl(): AbstractControl {
    return this.form.get(FormId.Content)
  }
}

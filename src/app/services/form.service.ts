import { Injectable } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { FormId } from '../models';

@Injectable()
export class NoteFormService {
  constructor(private fb: FormBuilder) { }

  public buildForm(): FormGroup {
    return this.fb.group({
      [FormId.Title]: null,
      [FormId.Content]: null
    });
  }
}

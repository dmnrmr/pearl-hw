import { Injectable } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { FormId } from '../models';

@Injectable()
export class NoteFormService {
  constructor(private fb: FormBuilder) { }

  public buildForm(title: string, content: string): FormGroup {
    return this.fb.group({
      [FormId.Title]: title,
      [FormId.Content]: content
    });
  }
}

import { Subject } from 'rxjs';
import { Shallow } from 'shallow-render';
import { Rendering } from 'shallow-render/dist/lib/models/rendering';
import { emptyNote, note as noteFixture } from '../../../fixtures';
import { AppModule } from '../../app.module';
import { Note, NotePosition, NoteTextValue } from '../../models';
import { NoteFormService } from '../../services/form.service';
import { ButtonComponent } from '../button/button.component';
import { NoteComponent } from './note.component';

interface ShallowMockBindings {
  note: Note;
  handleRemoveNote: () => void;
  handleNoteTextValueChange: (_: NoteTextValue) => void;
  handleNotePositionChange: (_: NotePosition) => void;
}

interface ShallowMockArguments {
  shallow: Shallow<NoteComponent>;
  note?: Note;
}

const getShallowMock = async ({
  shallow,
  note = noteFixture
}: ShallowMockArguments): Promise<Rendering<NoteComponent, ShallowMockBindings>> => {
  const handleRemoveNote = (): void => void 0;
  const handleNoteTextValueChange = (_: NoteTextValue): void => void 0;
  const handleNotePositionChange = (_: NotePosition): void => void 0;

  return shallow.render(
    `
      <prl-note
        [note]="note"
        (handleRemoveNote)="handleRemoveNote()"
        (handleNoteTextValueChange)="handleNoteTextValueChange($event)"
        (handleNotePositionChange)="handleNotePositionChange($event)"
      ></prl-note>
    `,
    {
      bind: {
        note,
        handleRemoveNote,
        handleNoteTextValueChange,
        handleNotePositionChange
      }
    }
  );
};

describe('Note', () => {
  const valueChangesSubject = new Subject();
  const formServiceMock = {
    buildForm: (_: string, __: string) => ({
      valueChanges: valueChangesSubject,
      get: () => void 0
    })
  };

  let shallow: Shallow<NoteComponent>;

  beforeEach(() => {
    shallow = new Shallow(NoteComponent, AppModule)
      .mock(NoteFormService, formServiceMock as any)
  });

  it(`should set note's background color`, async () => {
    const note = {
      ...emptyNote,
      backgroundColor: 'rgb(1, 3, 3)'
    };
    const { find } = await getShallowMock({ shallow, note });

    const formRef = find('.note');

    expect(formRef.nativeElement.style['background-color']).toBe(note.backgroundColor);
  });

  it(`should set note's input text color`, async () => {
    const note = {
      ...emptyNote,
      textColor: 'rgb(1, 3, 3)'
    };
    const { find } = await getShallowMock({ shallow, note });

    const titleRef = find('.note__title');

    expect(titleRef.nativeElement.style.color).toBe(note.textColor);
  });

  it(`should set note's textarea text color`, async () => {
    const note = {
      ...emptyNote,
      textColor: 'rgb(1, 3, 3)'
    };
    const { find } = await getShallowMock({ shallow, note });

    const contentRef = find('.note__content');

    expect(contentRef.nativeElement.style.color).toBe(note.textColor);
  });

  it('should pass text color to button component', async () => {
    const note = {
      ...emptyNote,
      textColor: 'rgb(1, 3, 3)'
    };
    const { findComponent } = await getShallowMock({ shallow, note });

    const buttonComponentRef = findComponent(ButtonComponent);

    expect(buttonComponentRef.textColor).toBe(note.textColor);
  });

  it('should emit text value change event', async () => {
    const textValue = {
      title: 'Baz',
      content: 'Qux'
    };

    const { bindings } = await getShallowMock({ shallow });

    valueChangesSubject.next(textValue);

    expect(bindings.handleNoteTextValueChange).toHaveBeenCalledWith(textValue);
  });

  it('should emit position value change event', async () => {
    const position = {
      x: 13,
      y: 37
    };
    const dragEnd = {
      source: {
        getFreeDragPosition: () => position
      }
    };

    const { bindings, instance } = await getShallowMock({ shallow });

    instance.onDragEnded(dragEnd as any);

    expect(bindings.handleNotePositionChange).toHaveBeenCalledWith({ position });
  });

  it('should emit note remove event', async () => {
    const { bindings, instance } = await getShallowMock({ shallow });

    instance.onRemoveNote();

    expect(bindings.handleRemoveNote).toHaveBeenCalled();
  });
});

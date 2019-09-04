import { Shallow } from 'shallow-render';
import { Rendering } from 'shallow-render/dist/lib/models/rendering';
import { noteColors as noteColorsFixture } from '../../../fixtures';
import { AppModule } from '../../app.module';
import { NoteColor } from '../../models';
import { ButtonComponent } from '../button/button.component';
import { ColorSelectorComponent } from '../color-selector/color-selector.component';
import { HeaderComponent } from './header.component';

interface ShallowMockBindings {
  numberOfNotes: number;
  noteColors: NoteColor[];
  isColorSelectorEnabled: boolean;
  handleAddNote: () => void;
  handleRemoveAllNotes: () => void;
  handleSelectNoteColor: (_: NoteColor) => void;
}

interface ShallowMockArguments {
  shallow: Shallow<HeaderComponent>;
  numberOfNotes?: number;
  noteColors?: NoteColor[];
  isColorSelectorEnabled?: boolean;
}

const getShallowMock = async ({
  shallow,
  numberOfNotes = 13,
  noteColors = noteColorsFixture,
  isColorSelectorEnabled = true
}: ShallowMockArguments): Promise<Rendering<HeaderComponent, ShallowMockBindings>> => {
  const handleAddNote = (): void => void 0;
  const handleRemoveAllNotes = (): void => void 0;
  const handleSelectNoteColor = (_: NoteColor): void => void 0;

  return shallow.render(
    `
      <prl-header
        [numberOfNotes]="numberOfNotes"
        [noteColors]="noteColors"
        [isColorSelectorEnabled]="isColorSelectorEnabled"
        (handleAddNote)="handleAddNote()"
        (handleRemoveAllNotes)="handleRemoveAllNotes()"
        (handleSelectNoteColor)="handleSelectNoteColor($event)"
      ></prl-header>
    `,
    {
      bind: {
        numberOfNotes,
        noteColors,
        isColorSelectorEnabled,
        handleAddNote,
        handleRemoveAllNotes,
        handleSelectNoteColor
      }
    }
  );
};

describe('Header', () => {
  let shallow: Shallow<HeaderComponent>;

  beforeEach(() => {
    shallow = new Shallow(HeaderComponent, AppModule)
  });

  it('should render number of notes', async () => {
    const numberOfNotes = 1337;
    const { find } = await getShallowMock({ shallow, numberOfNotes });

    const numberOfNotesRef = find('.header__content-number-of-notes');

    expect(numberOfNotesRef.nativeElement.innerText).toBe(String(numberOfNotes));
  });

  it('should pass truthy `isDisabled` value to button component when color selector is disabled', async () => {
    const { findComponent } = await getShallowMock({ shallow, numberOfNotes: 0 });

    const [, buttonComponentRef] = findComponent(ButtonComponent);

    expect(buttonComponentRef.isDisabled).toBeTruthy();
  });

  it('should pass note colors to color selector', async () => {
    const noteColors = [];
    const { findComponent } = await getShallowMock({ shallow, noteColors });

    const [colorSelectorRef] = findComponent(ColorSelectorComponent);

    expect(colorSelectorRef.availableColors).toBe(noteColors);
  });

  it('should pass `isColorSelectorEnabled` to color selector', async () => {
    const isColorSelectorEnabled = false;
    const { findComponent } = await getShallowMock({ shallow, isColorSelectorEnabled });

    const [colorSelectorRef] = findComponent(ColorSelectorComponent);

    expect(colorSelectorRef.isColorSelectorEnabled).toBe(isColorSelectorEnabled);
  });

  it('should emit on adding a note', async () => {
    const { bindings, instance } = await getShallowMock({ shallow });

    instance.onAddNote();

    expect(bindings.handleAddNote).toHaveBeenCalled();
  });

  it('should emit on removing all notes', async () => {
    const { bindings, instance } = await getShallowMock({ shallow });

    instance.onRemoveAllNotes();

    expect(bindings.handleRemoveAllNotes).toHaveBeenCalled();
  });

  it('should emit on selecting note color', async () => {
    const [selectedNoteColor] = noteColorsFixture;
    const { bindings, instance } = await getShallowMock({ shallow });

    instance.onSelectNoteColor(selectedNoteColor);

    expect(bindings.handleSelectNoteColor).toHaveBeenCalledWith(selectedNoteColor);
  });
});

import { Shallow } from 'shallow-render';
import { Rendering } from 'shallow-render/dist/lib/models/rendering';
import { note as noteFixture, noteColors } from '../../../fixtures';
import { AppModule } from '../../app.module';
import { HeaderComponent } from '../../components/header/header.component';
import { NoteComponent } from '../../components/note/note.component';
import { Note } from '../../models';
import { NoteStorageService } from '../../services/storage.service';
import { NoteStoreService } from '../../services/store.service';
import { AppComponent } from './app.component';

interface ShallowMockArguments {
  shallow: Shallow<AppComponent>;
  selectedNoteId?: string;
  note?: Note;
}

const eventMock = {
  stopPropagation: jasmine.createSpy('event.stopPropagation')
} as any as MouseEvent;

const setInitialStateMock = jasmine.createSpy('noteStoreService.setInitialState');
const addNoteMock = jasmine.createSpy('noteStoreService.addNote');
const removeNoteMock = jasmine.createSpy('noteStoreService.removeNote');
const removeAllNotesMock = jasmine.createSpy('noteStoreService.removeAllNotes');
const updateNoteColorsMock = jasmine.createSpy('noteStoreService.updateNoteColors');
const updateNoteValuesMock = jasmine.createSpy('noteStoreService.updateNoteValues');
const getNotesMock = jasmine.createSpy('noteStorageService.updateNoteValues');

const getShallowMock = async ({
  shallow,
  selectedNoteId,
  note
}: ShallowMockArguments): Promise<Rendering<AppComponent, undefined>> => shallow
  .mock(NoteStoreService, {
    selectedNoteId,
    notes: { ...note && { note } },
    setInitialState: setInitialStateMock,
    addNote: addNoteMock,
    removeNote: removeNoteMock,
    removeAllNotes: removeAllNotesMock,
    updateNoteColors: updateNoteColorsMock,
    updateNoteValues: updateNoteValuesMock
  })
  .mock(NoteStorageService, {
    getNotes: getNotesMock
  })
  .render('<prl-root></prl-root>');

describe('App', () => {
  let shallow: Shallow<AppComponent>;

  beforeEach(() => {
    shallow = new Shallow(AppComponent, AppModule);
  });

  it('should pass number of notes to header component', async () => {
    const { findComponent } = await getShallowMock({ shallow });

    const headerComponentRef = findComponent(HeaderComponent);

    expect(headerComponentRef.numberOfNotes).toBe(0);
  });

  it('should pass note colors to header component', async () => {
    const { findComponent, instance } = await getShallowMock({ shallow });

    instance.noteColors = noteColors;

    const headerComponentRef = findComponent(HeaderComponent);

    expect(headerComponentRef.noteColors).toEqual(noteColors);
  });

  it('should pass falsy value of `isColorSelectorEnabled` to header component when note is not selected', async () => {
    const { findComponent } = await getShallowMock({ shallow });

    const headerComponentRef = findComponent(HeaderComponent);

    expect(headerComponentRef.isColorSelectorEnabled).toBeFalsy();
  });

  it('should pass truthy value of `isColorSelectorEnabled` to header component when note is selected', async () => {
    const selectedNoteId = 'foo';
    const { findComponent } = await getShallowMock({ shallow, selectedNoteId });

    const headerComponentRef = findComponent(HeaderComponent);

    expect(headerComponentRef.isColorSelectorEnabled).toBeTruthy();
  });

  it('should render one note', async () => {
    const { findComponent } = await getShallowMock({ shallow, note: noteFixture });

    const noteComponentRef = findComponent(NoteComponent);

    expect(noteComponentRef.length).toBe(1);
  });

  it('should pass note data to note component', async () => {
    const { findComponent } = await getShallowMock({ shallow, note: noteFixture });

    const noteComponentRef = findComponent(NoteComponent);

    expect(noteComponentRef.note).toBe(noteFixture);
  });

  it('should call `storageService.getNotes` on init', async () => {
    await getShallowMock({ shallow });

    expect(getNotesMock).toHaveBeenCalled();
  });

  it('should call `storeService.setInitialState` on init', async () => {
    getNotesMock.and.returnValue({ noteFixture });

    await getShallowMock({ shallow });

    expect(setInitialStateMock).toHaveBeenCalledWith({ noteFixture });
  });

  it('should call `storeService.addNote` on adding a note', async () => {
    const { instance } = await getShallowMock({ shallow });

    instance.onAddNote();

    expect(addNoteMock).toHaveBeenCalled();
  });

  it('should call `storeService.removeNote` on removing a note', async () => {
    const noteId = 'foo';
    const { instance } = await getShallowMock({ shallow });

    instance.onRemoveNote(noteId);

    expect(removeNoteMock).toHaveBeenCalledWith(noteId);
  });

  it('should call `storeService.removeAllNotes` on removing all notes', async () => {
    const { instance } = await getShallowMock({ shallow });

    instance.onRemoveAllNotes();

    expect(removeAllNotesMock).toHaveBeenCalled();
  });

  it('should call `storeService.updateNoteColors` on selecting a color for a note', async () => {
    const [noteColor] = noteColors;
    const { instance } = await getShallowMock({ shallow });

    instance.onSelectNoteColor(noteColor);

    expect(updateNoteColorsMock).toHaveBeenCalledWith(noteColor);
  });

  it('should call `storeService.updateNoteValues` on note text value change', async () => {
    const textValue = {
      title: 'Foo',
      content: 'Bar'
    };
    const noteId = 'Baz';
    const { instance } = await getShallowMock({ shallow });

    instance.onNoteTextValueChange(textValue, noteId);

    expect(updateNoteValuesMock).toHaveBeenCalledWith(textValue, noteId);
  });

  it('should call `storeService.updateNoteValues` on note position value change', async () => {
    const positionValue = {
      position: {
        x: 13,
        y: 37
      }
    };
    const noteId = 'Baz';
    const { instance } = await getShallowMock({ shallow });

    instance.onNotePositionChange(positionValue, noteId);

    expect(updateNoteValuesMock).toHaveBeenCalledWith(positionValue, noteId);
  });
});

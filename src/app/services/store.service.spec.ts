import { emptyNote, note, noteColors } from '../../fixtures';
import { NoteStoreService } from './store.service';

const storageServiceMock = jasmine.createSpyObj('NoteStorageService', ['storeNotes']);
let storeServiceInstance;

describe('Store service', () => {
  beforeEach(() => {
    storeServiceInstance = new NoteStoreService(storageServiceMock);
    storageServiceMock.storeNotes.calls.reset();
  });

  describe('setInitialState', () => {
    it('should set initial state', () => {
      const initialState = { note };

      storeServiceInstance.setInitialState(initialState);

      expect(storeServiceInstance.notes).toEqual(initialState);
    });

    it('should set empty initial state when notes are undefined', () => {
      storeServiceInstance.setInitialState(undefined);

      expect(storeServiceInstance.notes).toEqual({});
    });
  });

  describe('addNote', () => {
    it('should call `storageService.storeNotes` on adding a note', () => {

      storeServiceInstance.addNote();

      const { args } = storageServiceMock.storeNotes.calls.mostRecent();
      const [noteState] = args;
      const [noteKey] = Object.keys(noteState);

      expect(storageServiceMock.storeNotes).toHaveBeenCalledWith({
        [noteKey]: emptyNote
      });
    });
  });

  describe('removeNote', () => {
    it('should call `storageService.storeNotes` on removing a note', () => {
      const initialState = { note };

      storeServiceInstance.setInitialState(initialState);
      storeServiceInstance.removeNote('note');

      expect(storageServiceMock.storeNotes).toHaveBeenCalledWith({});
    });
  });

  describe('removeAllNotes', () => {
    it('should call `storageService.storeNotes` on removing all notes', () => {
      storeServiceInstance.removeAllNotes();

      expect(storageServiceMock.storeNotes).toHaveBeenCalledWith({});
    });
  });

  describe('updateNoteColors', () => {
    const [noteColor] = noteColors;

    it('should not call `storageService.storeNotes` on updating note colors when no note is selected', () => {
      storeServiceInstance.updateNoteColors(noteColor);

      expect(storageServiceMock.storeNotes).not.toHaveBeenCalled();
    });

    it('should call `storageService.storeNotes` on updating note colors', () => {
      const [{ code, textColor }] = noteColors;
      const initialState = { note };

      storeServiceInstance.setInitialState(initialState);
      storeServiceInstance.selectedNoteId = 'note';
      storeServiceInstance.updateNoteColors(noteColor);

      const updatedNote = {
        ...note,
        backgroundColor: code,
        textColor
      }

      expect(storageServiceMock.storeNotes).toHaveBeenCalledWith({ note: updatedNote });
    });
  });

  describe('updateNoteValues', () => {
    it(`should update note's text value`, () => {
      const initialState = { note };
      const textValue = {
        title: 'Baz',
        content: 'Qux'
      };

      storeServiceInstance.setInitialState(initialState);
      storeServiceInstance.updateNoteValues(textValue, 'note');

      const updatedNote = {
        ...note,
        title: textValue.title,
        content: textValue.content
      }

      expect(storageServiceMock.storeNotes).toHaveBeenCalledWith({ note: updatedNote });
    });

    it(`should update note's position value`, () => {
      const initialState = { note };
      const positionValue = {
        position: {
          x: 37,
          y: 13
        }
      };

      storeServiceInstance.setInitialState(initialState);
      storeServiceInstance.updateNoteValues(positionValue, 'note');

      const updatedNote = {
        ...note,
        position: positionValue.position
      }

      expect(storageServiceMock.storeNotes).toHaveBeenCalledWith({ note: updatedNote });
    });
  });
});

import { note } from '../../fixtures';
import { NoteStorageService } from './storage.service';

const storageServiceInstance = new NoteStorageService();
const notesStringifiedValue = '{"note":{"backgroundColor":"#ffffff","textColor":"#000000","position":{"x":0,"y":0},"title":"Foo","content":"Bar"}}';

describe('Storage service', () => {
  describe('storeNotes', () => {
    it('should call local storage to sore data', () => {
      const setItemSpy = spyOn(window.localStorage, 'setItem');

      storageServiceInstance.storeNotes({ note });

      expect(setItemSpy).toHaveBeenCalledWith('hw-homework', notesStringifiedValue);
    });
  });

  describe('getNotes', () => {
    it('should call local storage to retrieve data', () => {
      const getItemSpy = spyOn(window.localStorage, 'getItem').and.returnValue(notesStringifiedValue);

      storageServiceInstance.getNotes();

      expect(getItemSpy).toHaveBeenCalledWith('hw-homework');
    });

    it('should return stored notes', () => {
      spyOn(window.localStorage, 'getItem').and.returnValue(notesStringifiedValue);

      const result = storageServiceInstance.getNotes();

      expect(result).toEqual({ note });
    });
  });
});

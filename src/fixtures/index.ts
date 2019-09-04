import { FormId, Note, NoteColor } from '../app/models';

export const noteColors: NoteColor[] = [
  {
    id: 'blue',
    code: '#00ccff',
    label: 'Blue',
    textColor: '#000000'
  },
  {
    id: 'yellow',
    code: '#ffe96a',
    label: 'Yellow',
    textColor: '#000000'
  },
  {
    id: 'black',
    code: '#000000',
    label: 'Black',
    textColor: '#ffffff'
  }
];

export const emptyNote: Note = {
  backgroundColor: '#ffffff',
  textColor: '#000000',
  position: {
    x: 0,
    y: 0
  }
};

export const note: Note = {
  ...emptyNote,
  [FormId.Title]: 'Foo',
  [FormId.Content]: 'Bar'
};

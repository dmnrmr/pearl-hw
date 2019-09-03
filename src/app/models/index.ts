export enum FormId {
  Title = 'title',
  Content = 'content'
}

export interface NoteTextValue {
  [FormId.Title]?: null | string;
  [FormId.Content]?: null | string;
}

export interface NotePosition {
  position: {
    x: number;
    y: number;
  }
}

export interface Note extends NoteTextValue, NotePosition {
  backgroundColor: string;
  textColor: string;
}

export interface NoteEntries {
  [key: string]: Note;
}

export interface NoteColor {
  code: string;
  id: string;
  label: string;
  textColor: string;
}

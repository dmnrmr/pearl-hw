export enum FormId {
  Title = 'title',
  Content = 'content'
}

export interface NoteTextValue {
  [FormId.Title]?: null | string;
  [FormId.Content]?: null | string;
}

export interface Note extends NoteTextValue {
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

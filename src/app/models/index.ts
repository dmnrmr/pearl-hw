export interface Note {
  content?: string;
  title?: string;
}

export interface NoteColor {
  code: string;
  id: string;
  label: string;
  labelColor: string;
}

export enum FormId {
  Title = 'title',
  Content = 'content'
}

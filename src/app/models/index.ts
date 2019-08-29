export interface Note {
  backgroundColor: string;
  textColor: string;
  content?: string;
  title?: string;
}

export interface NoteColor {
  code: string;
  id: string;
  label: string;
  textColor: string;
}

export enum FormId {
  Title = 'title',
  Content = 'content'
}

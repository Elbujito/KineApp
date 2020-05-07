import { NoteTemplate } from './note-template.model';

export class PathologyType {
    constructor(
        public id?: number,
        public template?: NoteTemplate,
        public name?: string,
        public observation?: string,
        public level?: number
    )
    {
      this.template = new NoteTemplate();
    }
}





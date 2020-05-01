export class Note {
    constructor(
        public id?: number,
        public patientId?: number,
        public title?: string,
        public date?: Date,
        public description?: string
    )
    {
        this.date = new Date();
    }
}




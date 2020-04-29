import { Mouvement } from './mouvement.model';

export class BilanArticulaire {
    constructor(
        public id?: number,
        public date?: Date,
        public mouvement?: Mouvement,
        public amplitude?: number,
        public observation?: string
    )
    {
    }
}





import { Muscle } from './muscle.model';

export class BilanMusculaire {
    constructor(
        public id?: number,
        public date?: Date,
        public muscle?: Muscle,
        public cotation?: number,
        public observation?: string
    )
    {
    }
}





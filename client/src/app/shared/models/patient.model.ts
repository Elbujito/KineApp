import { Address } from './address.model';
import { Pathology } from './pathology.model';

export class Patient {
    constructor(
        public id?: number,
        public firstName?: string,
        public lastName?: string,
        public age?: number,
        public address?: Address,
        public email?: string,
        public createdAt?: Date,
        public active?: Boolean,
        public pathologies?: Pathology[],
        public displayedName?: string
    )
    {
    }
}





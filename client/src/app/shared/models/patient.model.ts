import { Address } from './address.model';
import { Pathology } from './pathology.model';

export class Patient {
    constructor(
        public id?: number,
        public firstName?: string,
        public lastName?: string,
		    public sexe?: string,
        public birthday?: Date,
		    public phoneNumber?: string,
        public address?: Address,
        public email?: string,
        public createdAt?: Date,
        public active?: Boolean,
        public pathologies?: Pathology[],
        public displayedName?: string
    )
    {
      this.address = new Address();
      this.pathologies = [];
    }
}





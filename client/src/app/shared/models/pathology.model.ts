import { BilanArticulaire } from './bilan-articulaire.model';
import { BilanMusculaire } from './bilan-musculaire.model';
import { BilanAlgique } from './bilan-algique.model';
import { Prescripteur } from './prescripteur.model';
import { Localisation } from './localisation.model';
import { PathologyType } from './pathology-type.model';

export class Pathology {
    constructor(
        public id?: number,
        public name?: string,
        public pathologyType?: PathologyType,
        public observation?: string,
        public createdAt?: Date,
        public lastModifcation?: Date,
        public prescripteur?: Prescripteur,
        public localisation?: Localisation,
        public discover?: Boolean,
        public active?: Boolean,
		public bilanArticulaires?: BilanArticulaire[],
		public bilanMusculaires?: BilanMusculaire[],
        public bilanAlgiques?: BilanAlgique[]
    )
    {
    }
}





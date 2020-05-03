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
        public lastModification?: Date,
        public prescripteur?: Prescripteur,
        public localisation?: Localisation,
        public discover?: Boolean,
        public active?: Boolean,
		public bilanArticulaires?: BilanArticulaire[],
		public bilanMusculaires?: BilanMusculaire[],
        public bilanAlgiques?: BilanAlgique[]
    )
    {
		this.pathologyType = new PathologyType();
		  this.createdAt = new Date();
      this.lastModification = new Date();
      this.prescripteur = new Prescripteur();
      this.localisation = new Localisation();
	    this.bilanArticulaires = [];
		  this.bilanMusculaires = [];
		  this.bilanAlgiques = [];
      this.observation = '';
		  this.discover = true;
		  this.active = false;
    }
}





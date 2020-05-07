import { Localisation, PathologyType, Prescripteur } from '../../shared/models/index';  
  
export class BilanHeader {
    localisation: Localisation;
    pathologyType: PathologyType;
    prescripteur: Prescripteur;
	createdAt: Date;
}

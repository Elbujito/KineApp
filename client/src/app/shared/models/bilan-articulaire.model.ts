import { Mouvement } from './mouvement.model';
import { DatePipe } from '@angular/common';

export class BilanArticulaire {
    constructor(
        public id?: number,
        public date?: Date,
        public mouvement?: Mouvement,
        public amplitude?: number,
        public observation?: string,
        public formatedDate?: string
    )
    {
          this.date = new Date();
          this.mouvement = new Mouvement();
    }
}





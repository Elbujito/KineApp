import { OnInit, Input, Component, ViewChild, ChangeDetectorRef, Output, EventEmitter} from '@angular/core';
import { MatSort } from '@angular/material/sort';
import { FormGroup, FormControl } from '@angular/forms';
import { MatTableDataSource } from '@angular/material/table';
import { DatePipe } from '@angular/common';

import { State } from '../models/index';
import { BilanAlgique } from '../../shared/models/index';
import { BilanAlgiquesService } from '../../shared/services/index';

@Component({
  selector: 'app-bilan-algique',
  templateUrl: './bilan-algique.component.html',
  styleUrls: ['./bilan-algique.component.css']
})
export class BilanAlgiqueComponent implements OnInit {

  public douleurs: string[] = ['1', '2', '3', '4','5', '6', '7', '8','9','10'];
  public saved: Boolean;
  public douleur: string;

  @Input('bilanAlgiques') bilanAlgiques: BilanAlgique[];

  @Output() bilanAlgiquesOutput = new EventEmitter<BilanAlgique[]>();

  constructor(private bilanAlgiquesService: BilanAlgiquesService)
  {
  }

  ngOnInit()
  {
  }

  ngAfterContentInit()
  {
     this.bilanAlgiquesService.getBilanAlgiques().subscribe(result => {
            if(this.bilanAlgiques != undefined  && this.bilanAlgiques.length > 0){
              this.douleur = String(this.bilanAlgiques[0].level);
            }
            else
              this.douleur = '5';
    });
    this.saved = true;
  }


  isSaved(): Boolean
  {
    return this.saved;
  }

  save()
  {
    let bilanAlgiques = [];
    let bilanAlgique = new BilanAlgique();
    this.bilanAlgiquesService.addBilanAlgique(bilanAlgique).subscribe(result => {
          bilanAlgique = result;
          bilanAlgique.level = Number(this.douleur);
          bilanAlgique.date = new Date();
          bilanAlgiques.push(bilanAlgique);
          this.bilanAlgiquesOutput.emit(bilanAlgiques);
          this.saved = true;
    });
  }

  onChange()
  {
      this.saved = false;
  }
}

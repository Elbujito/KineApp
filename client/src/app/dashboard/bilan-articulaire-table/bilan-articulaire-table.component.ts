import { OnInit, Input, Component, ViewChild, ChangeDetectorRef, Output, EventEmitter} from '@angular/core';
import { MatSort } from '@angular/material/sort';
import { FormGroup, FormControl } from '@angular/forms';
import { MatTableDataSource } from '@angular/material/table';
import { DatePipe } from '@angular/common';

import { State } from '../models/index';
import { BilanArticulaire, Mouvement } from '../../shared/models/index';
import { BilanArticulairesService, MouvementsService } from '../../shared/services/index';

@Component({
  selector: 'app-bilan-articulaire-table',
  templateUrl: './bilan-articulaire-table.component.html',
  styleUrls: ['./bilan-articulaire-table.component.css']
})
export class BilanArticulaireTableComponent implements OnInit {

  public states: State[] = [];
  public mouvements: Mouvement[] = [];
  public displayedColumns: string[] = ['date', 'mouvement', 'amplitude', 'remove', 'save'];
  public dataSource = new MatTableDataSource<BilanArticulaire>([]);

  @Input('bilanArticulaires') bilanArticulaires: BilanArticulaire[];

  @Output() bilanArticulairesOutput = new EventEmitter<BilanArticulaire[]>();

  constructor(private bilanArticulairesService: BilanArticulairesService,
			  private mouvementsServices: MouvementsService,

			  private changeDetectorRefs: ChangeDetectorRef)
  {

  }

  ngOnInit()
  {
      this.mouvementsServices.getMouvements().subscribe(mouvements => {
        this.mouvements = mouvements;
        if(this.bilanArticulaires != undefined)
        {
          this.bilanArticulaires.forEach( (bilanArticulaire, index) => {
              bilanArticulaire.formatedDate = new DatePipe('en-US').transform(bilanArticulaire.date, 'MM/dd/yyyy');
              this.addNewState(bilanArticulaire, true);
           });
           this.dataSource.data = this.bilanArticulaires;
         }
         else
         {
          this.bilanArticulaires = [];
         }
      });
  }

  addNewState(bilanArticulaire: BilanArticulaire, isSaved: Boolean)
  {
    let state = new State();
    state.index = this.bilanArticulaires.findIndex(ba => ba.id === bilanArticulaire.id);
    state.isSaved = isSaved;
    state.id = bilanArticulaire.id;
    this.states.unshift(state);
  }

  applyFilter(event: Event) {
      const filterValue = (event.target as HTMLInputElement).value;
      this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  addLine()
  {
     let bilanArticulaire = new BilanArticulaire();
     this.bilanArticulairesService.addBilanArticulaire(bilanArticulaire).subscribe(result => {
          this.bilanArticulaires.unshift(result);
          this.addNewState(result, false);
          this.dataSource.data = this.bilanArticulaires;
     });
  }

  isSaved(bilanArticulaire: BilanArticulaire): Boolean
  {
    let index = this.states.findIndex(s => s.id === bilanArticulaire.id);
    return index == -1 ? false : this.states[index].isSaved;
  }

  save(bilanArticulaire: BilanArticulaire)
  {
    let index = this.bilanArticulaires.findIndex(ba => ba.id === bilanArticulaire.id);
    let indexState = this.states.findIndex(s => s.id === bilanArticulaire.id);

    this.bilanArticulaires[index].date = new Date(bilanArticulaire.formatedDate);
    this.states[indexState].isSaved = true;
    this.bilanArticulairesOutput.emit(this.bilanArticulaires);
  }

  remove(bilanArticulaire: BilanArticulaire)
  {
    let index = this.bilanArticulaires.indexOf(bilanArticulaire);
    if (index != -1) {
      this.bilanArticulaires.splice(index, 1);
      this.bilanArticulairesOutput.emit(this.bilanArticulaires);
      this.dataSource.data = this.bilanArticulaires;
    }
  }

  refresh() {
    this.dataSource.data = this.bilanArticulaires;
    this.changeDetectorRefs.detectChanges();
  }

  onChange(bilanArticulaire: BilanArticulaire)
  {
      let index = this.states.findIndex(s => s.id === bilanArticulaire.id);
      this.states[index].isSaved = false;
  }
}

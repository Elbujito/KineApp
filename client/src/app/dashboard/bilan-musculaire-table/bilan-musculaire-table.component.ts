import { OnInit, Input, Component, ViewChild, ChangeDetectorRef, Output, EventEmitter} from '@angular/core';
import { MatSort } from '@angular/material/sort';
import { FormGroup, FormControl } from '@angular/forms';
import { MatTableDataSource } from '@angular/material/table';
import { DatePipe } from '@angular/common';

import { State } from '../models/index';
import { BilanMusculaire, Muscle } from '../../shared/models/index';
import { BilanMusculairesService, MusclesService } from '../../shared/services/index';

@Component({
  selector: 'app-bilan-musculaire-table',
  templateUrl: './bilan-musculaire-table.component.html',
  styleUrls: ['./bilan-musculaire-table.component.css']
})
export class BilanMusculaireTableComponent implements OnInit {

  public states: State[] = [];
  public muscles: Muscle[] = [];
  public displayedColumns: string[] = ['date', 'muscle', 'cotation', 'remove', 'save'];
  public dataSource = new MatTableDataSource<BilanMusculaire>([]);

  @Input('bilanMusculaires') bilanMusculaires: BilanMusculaire[];

  @Output() bilanMusculairesOutput = new EventEmitter<BilanMusculaire[]>();

  constructor(private bilanMusculairesService: BilanMusculairesService,
			  private musclesServices: MusclesService,

			  private changeDetectorRefs: ChangeDetectorRef)
  {

  }

  ngOnInit()
  {
      this.musclesServices.getMuscles().subscribe(muscles => {
        this.muscles = muscles;
        if(this.bilanMusculaires != undefined)
        {
          this.bilanMusculaires.forEach( (bilanMusculaire, index) => {
              bilanMusculaire.formatedDate = new DatePipe('en-US').transform(bilanMusculaire.date, 'MM/dd/yyyy');
              this.addNewState(bilanMusculaire, true);
           });
           this.dataSource.data = this.bilanMusculaires;
         }
         else
         {
          this.bilanMusculaires = [];
         }
      });
  }

  addNewState(bilanMusculaire: BilanMusculaire, isSaved: Boolean)
  {
    let state = new State();
    state.index = this.bilanMusculaires.findIndex(ba => ba.id === bilanMusculaire.id);
    state.isSaved = isSaved;
    state.id = bilanMusculaire.id;
    this.states.unshift(state);
  }

  applyFilter(event: Event) {
      const filterValue = (event.target as HTMLInputElement).value;
      this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  addLine()
  {
     let bilanMusculaire = new BilanMusculaire();
     this.bilanMusculairesService.addBilanMusculaire(bilanMusculaire).subscribe(result => {
          this.bilanMusculaires.unshift(result);
          this.addNewState(result, false);
          this.dataSource.data = this.bilanMusculaires;
     });
  }

  isSaved(bilanMusculaire: BilanMusculaire): Boolean
  {
    let index = this.states.findIndex(s => s.id === bilanMusculaire.id);
    return index == -1 ? false : this.states[index].isSaved;
  }

  save(bilanMusculaire: BilanMusculaire)
  {
    let index = this.bilanMusculaires.findIndex(ba => ba.id === bilanMusculaire.id);
    let indexState = this.states.findIndex(s => s.id === bilanMusculaire.id);

    this.bilanMusculaires[index].date = new Date(bilanMusculaire.formatedDate);
    this.states[indexState].isSaved = true;
    this.bilanMusculairesOutput.emit(this.bilanMusculaires);
  }

  remove(bilanMusculaire: BilanMusculaire)
  {
    let index = this.bilanMusculaires.indexOf(bilanMusculaire);
    if (index != -1) {
      this.bilanMusculaires.splice(index, 1);
      this.bilanMusculairesOutput.emit(this.bilanMusculaires);
      this.dataSource.data = this.bilanMusculaires;
    }
  }

  refresh() {
    this.dataSource.data = this.bilanMusculaires;
    this.changeDetectorRefs.detectChanges();
  }

  onChange(bilanMusculaire: BilanMusculaire)
  {
      let index = this.states.findIndex(s => s.id === bilanMusculaire.id);
      this.states[index].isSaved = false;
  }
}

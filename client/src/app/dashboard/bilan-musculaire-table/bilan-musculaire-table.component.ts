import { OnInit, Input, Component, ViewChild, ChangeDetectorRef} from '@angular/core';
import { MatSort } from '@angular/material/sort';
import { FormGroup, FormControl } from '@angular/forms';
import { MatTableDataSource } from '@angular/material/table';

import { State } from '../models/index';
import { BilanMusculaire, Muscle, Pathology, Patient } from '../../shared/models/index';
import { BilanMusculairesService, MusclesService, PatientsService } from '../../shared/services/index';

@Component({
  selector: 'app-bilan-musculaire-table',
  templateUrl: './bilan-musculaire-table.component.html',
  styleUrls: ['./bilan-musculaire-table.component.css']
})
export class BilanMusculaireTableComponent implements OnInit {

  public states: State[] = [];
  public muscles: Muscle[] = [];
  public pathology: Pathology;
  public patient: Patient;
  public displayedColumns: string[] = ['date', 'muscle', 'cotation', 'remove', 'save'];
  public dataSource = new MatTableDataSource<BilanMusculaire>([]);

  @Input('patient_id') patient_id: number;
  @Input('pathology_id') pathology_id: number;

  constructor(private bilanMusculairesService: BilanMusculairesService,
			  private musclesService: MusclesService,
			  private patientsService: PatientsService,
			  private changeDetectorRefs: ChangeDetectorRef)
  {
  }

  ngOnInit() {

    this.patientsService.getPatientById(this.patient_id).subscribe(patient => {
                  this.patient = patient;
  		this.pathology = patient.pathologies.find(p => p.id === this.pathology_id);
  		this.dataSource.data = this.pathology.bilanMusculaires;
  		this.pathology.bilanMusculaires.forEach( (bilanMusculaire, index) => {
                 let state = new State();
                 state.index = index;
                 state.isSaved = true;
                 state.id = bilanMusculaire.id;
                 this.states.push(state);
       });
     });

	  this.musclesService.getMuscles().subscribe(muscles => {
		  this.muscles = muscles;
	  });
  }

  applyFilter(event: Event) {
      const filterValue = (event.target as HTMLInputElement).value;
      this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  addLine()
  {
     let bilanMusculaire = new BilanMusculaire();
     this.bilanMusculairesService.addBilanMusculaire(bilanMusculaire).subscribe(result => {
          bilanMusculaire = result;

          let state = new State();
          state.index = this.pathology.bilanMusculaires.unshift(bilanMusculaire) - 1;
          state.isSaved = false;
          state.id = bilanMusculaire.id;
          this.states.unshift(state);
          this.dataSource.data = this.pathology.bilanMusculaires;
     });
  }

  isSaved(bilanMusculaire: BilanMusculaire): Boolean
  {
    let index = this.states.findIndex(s => s.id === bilanMusculaire.id);
    return index == -1 ? false : this.states[index].isSaved;
  }

  save(bilanMusculaire: BilanMusculaire)
  {
    let index = this.pathology.bilanMusculaires.findIndex(ba => ba.id === bilanMusculaire.id);
    let indexState = this.states.findIndex(s => s.id === bilanMusculaire.id);
    this.states[indexState].isSaved = true;
    this.pathology.bilanMusculaires[index] = bilanMusculaire;

    let indexPathology = this.patient.pathologies.findIndex(p => p.id === this.pathology_id);
    this.patient.pathologies[indexPathology] = this.pathology;
    this.patientsService.updatePatient(this.patient).subscribe( patient => {
         this.patient = patient;
    });
  }

  remove(bilanMusculaire: BilanMusculaire)
  {
      let index = this.pathology.bilanMusculaires.indexOf(bilanMusculaire);
      if (index !== -1) {
          this.pathology.bilanMusculaires.splice(index, 1);

          let indexPathology = this.patient.pathologies.findIndex(p => p.id === this.pathology_id);
          this.patient.pathologies[indexPathology] = this.pathology;

          this.patientsService.updatePatient(this.patient).subscribe( patient => {
              this.patient = patient;
              this.dataSource.data = this.pathology.bilanMusculaires;
          });
      }
  }

  refresh() {
    this.dataSource.data = this.pathology.bilanMusculaires;
    this.changeDetectorRefs.detectChanges();
  }

  onChange(bilanMusculaire: BilanMusculaire)
  {
      let index = this.states.findIndex(s => s.id === bilanMusculaire.id);
      this.states[index].isSaved = false;
  }
}

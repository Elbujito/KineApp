import { OnInit, Input, Component, ViewChild, ChangeDetectorRef} from '@angular/core';
import { MatSort } from '@angular/material/sort';
import { FormGroup, FormControl } from '@angular/forms';
import { MatTableDataSource } from '@angular/material/table';

import { State } from '../models/index';
import { BilanArticulaire, Mouvement, Pathology, Patient } from '../../shared/models/index';
import { BilanArticulairesService, MouvementsService, PatientsService } from '../../shared/services/index';

@Component({
  selector: 'app-bilan-articulaire-table',
  templateUrl: './bilan-articulaire-table.component.html',
  styleUrls: ['./bilan-articulaire-table.component.css']
})
export class BilanArticulaireTableComponent implements OnInit {

  public states: State[] = [];
  public mouvements: Mouvement[] = [];
  public pathology: Pathology;
  public patient: Patient;
  public displayedColumns: string[] = ['date', 'mouvement', 'amplitude', 'remove', 'save'];
  public dataSource = new MatTableDataSource<BilanArticulaire>([]);

  @Input('patient_id') patient_id: number;
  @Input('pathology_id') pathology_id: number;

  constructor(private bilanArticulairesService: BilanArticulairesService,
			  private mouvementsServices: MouvementsService,
			  private patientsService: PatientsService,
			  private changeDetectorRefs: ChangeDetectorRef)
  {
  }

  ngOnInit() {

    this.patientsService.getPatientById(this.patient_id).subscribe(patient => {
                  this.patient = patient;
  		this.pathology = patient.pathologies.find(p => p.id === this.pathology_id);
  		this.dataSource.data = this.pathology.bilanArticulaires;
  		this.pathology.bilanArticulaires.forEach( (bilanArticulaire, index) => {
                 let state = new State();
                 state.index = index;
                 state.isSaved = true;
                 state.id = bilanArticulaire.id;
                 this.states.push(state);
       });
     });

	  this.mouvementsServices.getMouvements().subscribe(mouvements => {
		  this.mouvements = mouvements;
	  });
  }

  applyFilter(event: Event) {
      const filterValue = (event.target as HTMLInputElement).value;
      this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  addLine()
  {
     let bilanArticulaire = new BilanArticulaire();
     this.bilanArticulairesService.addBilanArticulaire(bilanArticulaire).subscribe(result => {
          bilanArticulaire = result;

          let state = new State();
          state.index = this.pathology.bilanArticulaires.unshift(bilanArticulaire) - 1;
          state.isSaved = false;
          state.id = bilanArticulaire.id;
          this.states.unshift(state);
          this.dataSource.data = this.pathology.bilanArticulaires;
     });
  }

  isSaved(bilanArticulaire: BilanArticulaire): Boolean
  {
    let index = this.states.findIndex(s => s.id === bilanArticulaire.id);
    return index == -1 ? false : this.states[index].isSaved;
  }

  save(bilanArticulaire: BilanArticulaire)
  {
    let index = this.pathology.bilanArticulaires.findIndex(ba => ba.id === bilanArticulaire.id);
    let indexState = this.states.findIndex(s => s.id === bilanArticulaire.id);
    this.states[indexState].isSaved = true;
    this.pathology.bilanArticulaires[index] = bilanArticulaire;

    let indexPathology = this.patient.pathologies.findIndex(p => p.id === this.pathology_id);
    this.patient.pathologies[indexPathology] = this.pathology;
    this.patientsService.updatePatient(this.patient).subscribe( patient => {
         this.patient = patient;
    });
  }

  remove(bilanArticulaire: BilanArticulaire)
  {
      let index = this.pathology.bilanArticulaires.indexOf(bilanArticulaire);
      if (index !== -1) {
          this.pathology.bilanArticulaires.splice(index, 1);

          let indexPathology = this.patient.pathologies.findIndex(p => p.id === this.pathology_id);
          this.patient.pathologies[indexPathology] = this.pathology;

          this.patientsService.updatePatient(this.patient).subscribe( patient => {
              this.patient = patient;
              this.dataSource.data = this.pathology.bilanArticulaires;
          });
      }
  }

  refresh() {
    this.dataSource.data = this.pathology.bilanArticulaires;
    this.changeDetectorRefs.detectChanges();
  }

  onChange(bilanArticulaire: BilanArticulaire)
  {
      let index = this.states.findIndex(s => s.id === bilanArticulaire.id);
      this.states[index].isSaved = false;
  }
}

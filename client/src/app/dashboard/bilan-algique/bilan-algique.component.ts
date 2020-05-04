import { OnInit, Input, Component} from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';

import { BilanAlgique, Pathology, Patient } from '../../shared/models/index';
import { BilanAlgiquesService, PatientsService } from '../../shared/services/index';

@Component({
  selector: 'app-bilan-algique',
  templateUrl: './bilan-algique.component.html',
  styleUrls: ['./bilan-algique.component.css']
})
export class BilanAlgiqueComponent implements OnInit {

  public pathology: Pathology;
  public patient: Patient;
  public currentBilanAlgique: string;
  public douleurs: string[] = ['1', '2', '3', '4','5', '6', '7', '8','9','10'];

  @Input('patient_id') patient_id: number;
  @Input('pathology_id') pathology_id: number;

  constructor(private bilanAlgiquesService: BilanAlgiquesService,
			  private patientsService: PatientsService)
  {
  }

  ngOnInit() {

    this.patientsService.getPatientById(this.patient_id).subscribe(patient => {
                  this.patient = patient;
  		this.pathology = patient.pathologies.find(p => p.id === this.pathology_id);
     });

  }
}

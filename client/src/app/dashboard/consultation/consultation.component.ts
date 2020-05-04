import { Router, ActivatedRoute } from '@angular/router';
import { Component, OnInit, ChangeDetectorRef} from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { MatDialog } from "@angular/material/dialog";

import { Pathology, Patient} from '../../shared/models/index';
import { AlertService, PatientsService} from '../../shared/services/index';

import { ConsultationConfirmDialogComponent } from '../consultation-confirm-dialog/consultation-confirm-dialog.component';

@Component({
  selector: 'app-consultation',
  templateUrl: './consultation.component.html',
  styleUrls: ['./consultation.component.css']
})
export class ConsultationComponent implements OnInit {

  public patient: Patient = new Patient();
  public pathology: Pathology = new Pathology();
  public patient_id: number;
  public pathology_id: number;

  constructor(private router: Router, private route: ActivatedRoute,private dialog: MatDialog,
              private patientsService: PatientsService,
              private alertService: AlertService,
              private changeDetectorRefs: ChangeDetectorRef)
  {

      this.route.queryParams.subscribe(params => {
        this.patient_id = params['patient_id'];
        this.pathology_id = params['pathology_id'];
      });

      this.patientsService.getPatientById(this.patient_id).subscribe(patient => {
          this.patient = patient;
          this.pathology = this.patient.pathologies.find( pathology => pathology.id === this.pathology_id);
       });
  }


  ngOnInit() {
  }

  onSave()
  {
       this.alertService.showToaster("La pathologie a été sauvergardé");
  }

  onClose()
  {
    	const dialogRef = this.dialog.open(ConsultationConfirmDialogComponent,{
    		data:{dialogTitle: 'Quitter la consultation de '+this.patient.displayedName}
    		});
  }
}

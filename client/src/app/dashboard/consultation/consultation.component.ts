import { Router, ActivatedRoute } from '@angular/router';
import { Component, OnInit, ChangeDetectorRef, Input, EventEmitter, Output} from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { MatDialog } from "@angular/material/dialog";

import { Pathology, Patient, BilanArticulaire, BilanMusculaire} from '../../shared/models/index';
import { AlertService, PatientsService} from '../../shared/services/index';

import { ConsultationConfirmDialogComponent } from '../consultation-confirm-dialog/consultation-confirm-dialog.component';

import { BilanHeader } from '../models/index';

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

  @Input('bilanArticulairesOutput') bilanArticulaires: BilanArticulaire[];
  @Input('bilanMusculairesOutput') bilanMusculaires: BilanMusculaire[];

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

   onBilanArticulairesChanged(bilanArticulaires: BilanArticulaire[])
   {
      this.patientsService.getPatientById(this.patient_id).subscribe(patient => {
        this.patient = patient;

        let index = this.patient.pathologies.findIndex(p => p.id === this.pathology_id);
        this.patient.pathologies[index].bilanArticulaires = bilanArticulaires;

        this.patientsService.updatePatient(this.patient).subscribe( patient => {
          this.patient = patient;
          this.pathology.bilanArticulaires = bilanArticulaires;
        });
      });
   }

   onBilanMusculairesChanged(bilanMusculaires: BilanMusculaire[])
   {
         this.patientsService.getPatientById(this.patient_id).subscribe(patient => {
           this.patient = patient;

           let index = this.patient.pathologies.findIndex(p => p.id === this.pathology_id);
           this.patient.pathologies[index].bilanMusculaires = bilanMusculaires;

           this.patientsService.updatePatient(this.patient).subscribe( patient => {
             this.patient = patient;
             this.pathology.bilanMusculaires = bilanMusculaires;
           });
         });
   }

   onBilanHeaderChanged(bilanHeader: BilanHeader)
   {
      this.patientsService.getPatientById(this.patient_id).subscribe(patient => {
      this.patient = patient;

      let index = this.patient.pathologies.findIndex(p => p.id === this.pathology_id);
      this.patient.pathologies[index].localisation = bilanHeader.localisation;
      this.patient.pathologies[index].prescripteur = bilanHeader.prescripteur;
      this.patient.pathologies[index].createdAt = bilanHeader.createdAt;
      this.patient.pathologies[index].pathologyType = bilanHeader.pathologyType;
        this.patientsService.updatePatient(this.patient).subscribe( patient => {
          this.patient = patient;
          this.pathology.localisation = bilanHeader.localisation;
          this.pathology.prescripteur = bilanHeader.prescripteur;
          this.pathology.createdAt =     bilanHeader.createdAt;
          this.pathology.pathologyType = bilanHeader.pathologyType;
        });
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

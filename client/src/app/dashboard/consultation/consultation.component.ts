import { Router, ActivatedRoute } from '@angular/router';
import { Component, OnInit, ChangeDetectorRef, Input, EventEmitter, Output} from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { MatDialog } from "@angular/material/dialog";

import { Pathology, Patient, BilanArticulaire, BilanMusculaire, BilanAlgique} from '../../shared/models/index';
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
  public saved: Boolean;

  @Input('bilanArticulairesOutput') bilanArticulaires: BilanArticulaire[];
  @Input('bilanMusculairesOutput') bilanMusculaires: BilanMusculaire[];
  @Input('bilanAlgiqueOutput') bilanAlgique: BilanAlgique;

  constructor(private router: Router, private route: ActivatedRoute,private dialog: MatDialog,
              private patientsService: PatientsService,
              private alertService: AlertService,
              private changeDetectorRefs: ChangeDetectorRef)
  {
      this.saved = true;
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


   onBilanArticulairesChanged(bilanArticulaires: BilanArticulaire[])
   {
      this.patientsService.getPatientById(this.patient_id).subscribe(patient => {
        this.patient = patient;

        let index = this.patient.pathologies.findIndex(p => p.id === this.pathology_id);
        this.patient.pathologies[index].bilanArticulaires = bilanArticulaires;
        this.patient.pathologies[index].lastModification = new Date();

        this.patientsService.updatePatient(this.patient).subscribe( patient => {
          this.patient = patient;
          this.pathology.bilanArticulaires = bilanArticulaires;
          this.pathology.lastModification = this.patient.pathologies[index].lastModification;
          this.alertService.showToaster("La pathologie a été sauvergardé");
        });
      });
   }

   onBilanMusculairesChanged(bilanMusculaires: BilanMusculaire[])
   {
         this.patientsService.getPatientById(this.patient_id).subscribe(patient => {
           this.patient = patient;

           let index = this.patient.pathologies.findIndex(p => p.id === this.pathology_id);
           this.patient.pathologies[index].bilanMusculaires = bilanMusculaires;
           this.patient.pathologies[index].lastModification = new Date();

           this.patientsService.updatePatient(this.patient).subscribe( patient => {
             this.patient = patient;
             this.pathology.bilanMusculaires = bilanMusculaires;
             this.pathology.lastModification = this.patient.pathologies[index].lastModification;
             this.alertService.showToaster("La pathologie a été sauvergardé");
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
      this.patient.pathologies[index].lastModification = new Date();
        this.patientsService.updatePatient(this.patient).subscribe( patient => {
          this.patient = patient;
          this.pathology.localisation = bilanHeader.localisation;
          this.pathology.prescripteur = bilanHeader.prescripteur;
          this.pathology.createdAt =     bilanHeader.createdAt;
          this.pathology.pathologyType = bilanHeader.pathologyType;
          this.pathology.lastModification = this.patient.pathologies[index].lastModification;
          this.alertService.showToaster("La pathologie a été sauvergardé");
        });
      });
   }

   onBilanAlgiquesChanged(bilanAlgiques: BilanAlgique[])
   {
         this.patientsService.getPatientById(this.patient_id).subscribe(patient => {
         this.patient = patient;

         let index = this.patient.pathologies.findIndex(p => p.id === this.pathology_id);
         this.patient.pathologies[index].bilanAlgiques = bilanAlgiques;
         this.patient.pathologies[index].lastModification = new Date();
           this.patientsService.updatePatient(this.patient).subscribe( patient => {
             this.patient = patient;
             this.pathology.bilanAlgiques = bilanAlgiques;
             this.pathology.lastModification = this.patient.pathologies[index].lastModification;
             this.alertService.showToaster("La pathologie a été sauvergardé");
           });
         });
   }

      onChange()
      {
         this.saved = false;
      }

      isSaved(): Boolean
      {
         return this.saved;
      }

  onSave()
  {
    this.patientsService.getPatientById(this.patient_id).subscribe(patient => {
      this.patient = patient;
       let index = this.patient.pathologies.findIndex(p => p.id === this.pathology_id);
       this.patient.pathologies[index].name = this.pathology.name;
       this.patient.pathologies[index].discover = this.pathology.discover;
       this.patient.pathologies[index].active = this.pathology.active;
       this.patient.pathologies[index].observationArticulaire = this.pathology.observationArticulaire;
       this.patient.pathologies[index].observationMusculaire = this.pathology.observationMusculaire;
       this.patient.pathologies[index].lastModification = new Date();
       this.patientsService.updatePatient(this.patient).subscribe( patient => {
            this.patient = patient;
            this.alertService.showToaster("La pathologie a été sauvergardé");
            this.saved = true;
      });
    });
  }

  onClose()
  {
    	const dialogRef = this.dialog.open(ConsultationConfirmDialogComponent,{
    		data:{dialogTitle: 'Quitter la consultation de '+this.patient.displayedName}
    		});
  }
}

import { Pathology, PathologyType, Localisation, Prescripteur, Patient} from '../../../shared/models/index';
import { PathologiesService, PathologyTypesService, LocalisationsService, PrescripteursService, PatientsService } from '../../../shared/services/index';

import {Component, Inject, OnInit, ViewEncapsulation} from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from "@angular/material/dialog";
import {FormBuilder, Validators, FormGroup} from "@angular/forms";
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-pathology-dialog',
  templateUrl: './pathology-dialog.component.html',
  styleUrls: ['./pathology-dialog.component.css']
})

export class PathologyDialogComponent implements OnInit {
  public pathology: Pathology;
  public pathologyTypes: PathologyType[] = [];
  public localisations: Localisation[] = [];
  public prescripteurs: Prescripteur[] = [];
  public pathologies: Pathology[] = [];
  private patient: Patient = new Patient();

    constructor(
    private pathologyTypesService: PathologyTypesService,
    private localisationsService: LocalisationsService,
    private prescripteursService: PrescripteursService,
    private pathologiesService: PathologiesService,
    private patientsService: PatientsService,
    public dialogRef: MatDialogRef<PathologyDialogComponent>,
      @Inject(MAT_DIALOG_DATA) public data: any) {
      this.pathology = new Pathology();
    }

  ngOnInit() {


       this.pathologyTypesService.getPathologyTypes().subscribe(pathologyTypes => {
          this.pathologyTypes = pathologyTypes;
       });

       this.localisationsService.getLocalisations().subscribe(localisations => {
           this.localisations = localisations;
       });

       this.prescripteursService.getPrescripteurs().subscribe(prescripteurs => {
           this.prescripteurs = prescripteurs;
       });

        this.pathologiesService.getPathologies().subscribe(pathologies => {
            this.pathologies = pathologies;
        });

       this.patientsService.getPatientById(this.data.patient_id).subscribe(patient => {
           this.patient = patient;
        });
  }

   public onSubmit() {
      this.pathologiesService.addPathology(this.pathology).subscribe(result => {
      });
      this.patient.pathologies.push(this.pathology);
      this.patientsService.updatePatient(this.patient).subscribe(result => { });
      this.dialogRef.close(true);
   }

  close() {
    this.dialogRef.close(null);
  }

}

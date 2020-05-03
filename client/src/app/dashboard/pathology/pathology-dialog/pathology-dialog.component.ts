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
  public pathologyName: string;
  public prescripteurName: string;
  public localisationName: string;
  public pathologyTypeName: string;
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

      let pathology = new Pathology();
      pathology.name = this.pathologyName;
      pathology.localisation = this.localisations.find(l => l.name === this.pathologyName);
      pathology.prescripteur = this.prescripteurs.find(p => p.name === this.prescripteurName);
      pathology.pathologyType = this.pathologyTypes.find(pt => pt.name === this.pathologyTypeName);

      this.pathologiesService.addPathology(pathology).subscribe(result => {
        pathology = result;
        this.patient.pathologies.push(pathology);
        this.patientsService.updatePatient(this.patient).subscribe(result => { });
        this.dialogRef.close(true);
      });
   }

  close() {
    this.dialogRef.close(null);
  }

}

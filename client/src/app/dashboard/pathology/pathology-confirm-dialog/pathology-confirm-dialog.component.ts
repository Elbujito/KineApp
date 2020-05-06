import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

import { Pathology, Patient } from '../../../shared/models/index';
import { PathologiesService, PatientsService } from '../../../shared/services/index';
import { NgForm } from '@angular/forms';

import {FormBuilder, Validators, FormGroup} from "@angular/forms";

@Component({
  selector: 'app-pathology-confirm-dialog',
  templateUrl: './pathology-confirm-dialog.component.html',
  styleUrls: ['./pathology-confirm-dialog.component.css']
})
export class PathologyConfirmDialogComponent implements OnInit {
  public pathology: Pathology;
  public patient: Patient;

    constructor(private pathologiesService: PathologiesService,
                private patientsService: PatientsService,
    public dialogRef: MatDialogRef<PathologyConfirmDialogComponent>,
      @Inject(MAT_DIALOG_DATA) public data: any) {
    }

  ngOnInit() {
      this.patientsService.getPatientById(this.data.patient_id).subscribe(patient => {
        this.patient = patient;
        this.pathology = this.patient.pathologies.find(p => p.id === this.data.pathology_id);
       });
  }

  public onSubmit() {
      this.patientsService.getPatientById(this.patient.id).subscribe(patient => {
        this.patient = patient;

        let index = this.patient.pathologies.findIndex(p => p.id === this.data.pathology_id);
        if (index != -1) {
          this.patient.pathologies.splice(index, 1);
          this.patientsService.updatePatient(this.patient).subscribe(result => { });
          this.dialogRef.close(true);
        }
      });
   }

  close() {
    this.dialogRef.close(null);
  }

}

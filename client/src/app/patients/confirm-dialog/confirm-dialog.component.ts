import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

import {PatientsService} from '../../core/services/patients.service';
import {Patient} from '../../shared/models/patient.model';
import { NgForm } from '@angular/forms';

import {FormBuilder, Validators, FormGroup} from "@angular/forms";

@Component({
  selector: 'app-confirm-dialog',
  templateUrl: './confirm-dialog.component.html',
  styleUrls: ['./confirm-dialog.component.css']
})
export class ConfirmDialogComponent implements OnInit {
  public patient: Patient;

    constructor(private patientsService: PatientsService,
    public dialogRef: MatDialogRef<ConfirmDialogComponent>,
      @Inject(MAT_DIALOG_DATA) public data: any) {
    }

  ngOnInit() {
     if(this.data.patient_id != '')
      {
        this.patientsService.getPatientById(this.data.patient_id).subscribe(patient => {
        this.patient = patient;
      });
     }
  }

  public onSubmit() {
      this.dialogRef.close(true);
      this.patientsService.removePatient(this.patient).subscribe(result => { });
   }

  close() {
    this.dialogRef.close(null);
  }

}

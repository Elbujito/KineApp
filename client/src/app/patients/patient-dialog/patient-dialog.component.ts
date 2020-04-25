import {PatientsService} from '../../core/services/patients.service';
import {Patient} from '../../shared/models/patient.model';

import {Component, Inject, OnInit, ViewEncapsulation} from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from "@angular/material/dialog";
import {FormBuilder, Validators, FormGroup} from "@angular/forms";


@Component({
  selector: 'app-patient-dialog',
  templateUrl: './patient-dialog.component.html',
  styleUrls: ['./patient-dialog.component.css']
})

export class PatientDialogComponent implements OnInit {
  patient: Patient = new Patient();
  form: FormGroup;

    constructor(
    private patientsService: PatientsService,
    public dialogRef: MatDialogRef<PatientDialogComponent>,
      @Inject(MAT_DIALOG_DATA) public data: any) {
    }

  ngOnInit() {
  }

  save() {
    this.dialogRef.close(this.form.value);
  }

  close() {
    this.dialogRef.close();
  }

}

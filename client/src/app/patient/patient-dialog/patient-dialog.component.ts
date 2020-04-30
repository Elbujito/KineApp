import {PatientsService} from '../../shared/services/index';
import {Patient, Pathology} from '../../shared/models/index';
import { MatTableDataSource } from '@angular/material/table';
import {Component, Inject, OnInit, ViewEncapsulation} from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from "@angular/material/dialog";
import {FormBuilder, Validators, FormGroup} from "@angular/forms";
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-patient-dialog',
  templateUrl: './patient-dialog.component.html',
  styleUrls: ['./patient-dialog.component.css']
})

export class PatientDialogComponent implements OnInit {
  public patient: Patient = new Patient();
  public isReadOnly: Boolean;

    displayedColumns: string[] = ['name', 'observation'];
    dataSource = new MatTableDataSource<Pathology>([]);

    constructor(
    private patientsService: PatientsService,
    public dialogRef: MatDialogRef<PatientDialogComponent>,
      @Inject(MAT_DIALOG_DATA) public data: any) {
    }

  ngOnInit() {
      if(this.data.patient_id != '')
      {
        this.patientsService.getPatientById(this.data.patient_id).subscribe(patient => {
          this.patient = patient;
        });
      }
      this.isReadOnly = this.data.readonly;
  }

   public onSubmit() {

      if(this.data.patient_id != '')
      {
        this.patientsService.updatePatient(this.patient).subscribe(result => { });
      }
      else
      {
        this.patient.createdAt = new Date();
        this.patientsService.addPatient(this.patient).subscribe(result => { });
      }
      this.dialogRef.close(true);
   }

  close() {
    this.dialogRef.close(null);
  }

}

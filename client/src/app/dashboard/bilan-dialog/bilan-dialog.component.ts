import {BilansService} from '../../shared/services/index';
import {Bilan} from '../../shared/models/index';

import {Component, Inject, OnInit, ViewEncapsulation} from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from "@angular/material/dialog";
import {FormBuilder, Validators, FormGroup} from "@angular/forms";
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-bilan-dialog',
  templateUrl: './bilan-dialog.component.html',
  styleUrls: ['./bilan-dialog.component.css']
})

export class BilanDialogComponent implements OnInit {
  public bilan: Bilan = new Bilan();

    constructor(
    private bilansService: BilansService,
    public dialogRef: MatDialogRef<BilanDialogComponent>,
      @Inject(MAT_DIALOG_DATA) public data: any) {
    }

  ngOnInit() {
      if(this.data.bilan_id != -1)
      {
        this.bilansService.getBilanById(this.data.bilan_id).subscribe(bilan => {
          this.bilan = bilan;
        });
      }
  }

   public onSubmit() {
      if(this.data.bilan_id != -1) this.bilansService.updateBilan(this.bilan).subscribe(result => { });
      else
	  {
		  this.bilan.patientId = this.data.patient_id;
		  this.bilan.id = -1;
		  console.log("Patient id is : ",this.bilan.patientId);
		  this.bilansService.addBilan(this.bilan).subscribe(result => { });
	  }
      this.dialogRef.close(true);
   }

  close() {
    this.dialogRef.close(null);
  }

}

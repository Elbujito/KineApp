import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

import {BilansService} from '../../shared/services/index';
import {Bilan} from '../../shared/models/index';
import { NgForm } from '@angular/forms';

import {FormBuilder, Validators, FormGroup} from "@angular/forms";

@Component({
  selector: 'app-bilan-confirm-dialog',
  templateUrl: './bilan-confirm-dialog.component.html',
  styleUrls: ['./bilan-confirm-dialog.component.css']
})
export class BilanConfirmDialogComponent implements OnInit {
  public bilan: Bilan;

    constructor(private bilansService: BilansService,
    public dialogRef: MatDialogRef<BilanConfirmDialogComponent>,
      @Inject(MAT_DIALOG_DATA) public data: any) {
    }

  ngOnInit() {
     if(this.data.bilan_id != '')
      {
        this.bilansService.getBilanById(this.data.bilan_id).subscribe(bilan => {
        this.bilan = bilan;
      });
     }
  }

  public onSubmit() {
      this.dialogRef.close(true);
      this.bilansService.removeBilan(this.bilan).subscribe(result => { });
   }

  close() {
    this.dialogRef.close(null);
  }

}

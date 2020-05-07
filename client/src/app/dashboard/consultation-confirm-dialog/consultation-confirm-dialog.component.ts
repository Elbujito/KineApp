import { Component, OnInit, Inject } from '@angular/core';
import { Router, ActivatedRoute, NavigationExtras } from '@angular/router';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

import { NgForm } from '@angular/forms';

import {FormBuilder, Validators, FormGroup} from "@angular/forms";

@Component({
  selector: 'app-consultation-confirm-dialog',
  templateUrl: './consultation-confirm-dialog.component.html',
  styleUrls: ['./consultation-confirm-dialog.component.css']
})
export class ConsultationConfirmDialogComponent implements OnInit {

    constructor(private router: Router, private route: ActivatedRoute,
    public dialogRef: MatDialogRef<ConsultationConfirmDialogComponent>,
      @Inject(MAT_DIALOG_DATA) public data: any) {
    }

  ngOnInit() {
  }

  public onCancel()
  {
     this.dialogRef.close(false);
  }

  onClose() {
    this.dialogRef.close(true);
	this.router.navigate(['dashboard']);
  }

}

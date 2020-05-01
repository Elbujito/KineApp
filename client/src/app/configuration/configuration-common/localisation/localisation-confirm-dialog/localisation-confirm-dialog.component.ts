import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

import {LocalisationsService} from '../../../../shared/services/localisations.service';
import {Localisation} from '../../../../shared/models/localisation.model';
import { NgForm } from '@angular/forms';

import {FormBuilder, Validators, FormGroup} from "@angular/forms";

@Component({
  selector: 'app-localisation-confirm-dialog',
  templateUrl: './localisation-confirm-dialog.component.html',
  styleUrls: ['./localisation-confirm-dialog.component.css']
})
export class LocalisationConfirmDialogComponent implements OnInit {
  public localisation: Localisation;

    constructor(private localisationsService: LocalisationsService,
    public dialogRef: MatDialogRef<LocalisationConfirmDialogComponent>,
      @Inject(MAT_DIALOG_DATA) public data: any) {
    }

  ngOnInit() {
     if(this.data.localisation_id != '')
      {
        this.localisationsService.getLocalisationById(this.data.localisation_id).subscribe(localisation => {
        this.localisation = localisation;
      });
     }
  }

  public onSubmit() {
      this.dialogRef.close(true);
      this.localisationsService.removeLocalisation(this.localisation).subscribe(result => { });
   }

  close() {
    this.dialogRef.close(null);
  }

}

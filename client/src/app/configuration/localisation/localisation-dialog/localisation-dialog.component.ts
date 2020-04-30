import {LocalisationsService} from '../../../shared/services/localisations.service';
import {Localisation} from '../../../shared/models/localisation.model';

import {Component, Inject, OnInit, ViewEncapsulation} from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from "@angular/material/dialog";
import {FormBuilder, Validators, FormGroup} from "@angular/forms";
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-localisation-dialog',
  templateUrl: './localisation-dialog.component.html',
  styleUrls: ['./localisation-dialog.component.css']
})

export class LocalisationDialogComponent implements OnInit {
  public localisation: Localisation = new Localisation();

    constructor(
    private localisationsService: LocalisationsService,
    public dialogRef: MatDialogRef<LocalisationDialogComponent>,
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
      if(this.data.localisation_id != '') this.localisationsService.updateLocalisation(this.localisation).subscribe(result => { });
      else this.localisationsService.addLocalisation(this.localisation).subscribe(result => { });
      this.dialogRef.close(true);
   }

  close() {
    this.dialogRef.close(null);
  }

}

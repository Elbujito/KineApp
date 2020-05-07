import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

import {PrescripteursService} from '../../../../shared/services/prescripteurs.service';
import {Prescripteur} from '../../../../shared/models/prescripteur.model';
import { NgForm } from '@angular/forms';

import {FormBuilder, Validators, FormGroup} from "@angular/forms";

@Component({
  selector: 'app-prescripteur-confirm-dialog',
  templateUrl: './prescripteur-confirm-dialog.component.html',
  styleUrls: ['./prescripteur-confirm-dialog.component.css']
})
export class PrescripteurConfirmDialogComponent implements OnInit {
  public prescripteur: Prescripteur;

    constructor(private prescripteursService: PrescripteursService,
    public dialogRef: MatDialogRef<PrescripteurConfirmDialogComponent>,
      @Inject(MAT_DIALOG_DATA) public data: any) {
    }

  ngOnInit() {
     if(this.data.prescripteur_id != '')
      {
        this.prescripteursService.getPrescripteurById(this.data.prescripteur_id).subscribe(prescripteur => {
        this.prescripteur = prescripteur;
      });
     }
  }

  public onSubmit() {
      this.dialogRef.close(true);
      this.prescripteursService.removePrescripteur(this.prescripteur).subscribe(result => { });
   }

  close() {
    this.dialogRef.close(null);
  }

}

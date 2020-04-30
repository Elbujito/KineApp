import {PrescripteursService} from '../../../shared/services/prescripteurs.service';
import {Prescripteur} from '../../../shared/models/prescripteur.model';

import {Component, Inject, OnInit, ViewEncapsulation} from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from "@angular/material/dialog";
import {FormBuilder, Validators, FormGroup} from "@angular/forms";
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-prescripteur-dialog',
  templateUrl: './prescripteur-dialog.component.html',
  styleUrls: ['./prescripteur-dialog.component.css']
})

export class PrescripteurDialogComponent implements OnInit {
  public prescripteur: Prescripteur = new Prescripteur();

    constructor(
    private prescripteursService: PrescripteursService,
    public dialogRef: MatDialogRef<PrescripteurDialogComponent>,
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
      if(this.data.prescripteur_id != '') this.prescripteursService.updatePrescripteur(this.prescripteur).subscribe(result => { });
      else this.prescripteursService.addPrescripteur(this.prescripteur).subscribe(result => { });
      this.dialogRef.close(true);
   }

  close() {
    this.dialogRef.close(null);
  }

}

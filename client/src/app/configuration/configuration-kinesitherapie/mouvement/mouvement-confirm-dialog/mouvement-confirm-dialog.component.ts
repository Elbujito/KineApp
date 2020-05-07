import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

import {MouvementsService} from '../../../../shared/services/mouvements.service';
import {Mouvement} from '../../../../shared/models/mouvement.model';
import { NgForm } from '@angular/forms';

import {FormBuilder, Validators, FormGroup} from "@angular/forms";

@Component({
  selector: 'app-mouvement-confirm-dialog',
  templateUrl: './mouvement-confirm-dialog.component.html',
  styleUrls: ['./mouvement-confirm-dialog.component.css']
})
export class MouvementConfirmDialogComponent implements OnInit {
  public mouvement: Mouvement;

    constructor(private mouvementsService: MouvementsService,
    public dialogRef: MatDialogRef<MouvementConfirmDialogComponent>,
      @Inject(MAT_DIALOG_DATA) public data: any) {
    }

  ngOnInit() {
     if(this.data.mouvement_id != '')
      {
        this.mouvementsService.getMouvementById(this.data.mouvement_id).subscribe(mouvement => {
        this.mouvement = mouvement;
      });
     }
  }

  public onSubmit() {
      this.dialogRef.close(true);
      this.mouvementsService.removeMouvement(this.mouvement).subscribe(result => { });
   }

  close() {
    this.dialogRef.close(null);
  }

}

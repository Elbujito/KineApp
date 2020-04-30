import {MouvementsService} from '../../../shared/services/mouvements.service';
import {Mouvement} from '../../../shared/models/mouvement.model';

import {Component, Inject, OnInit, ViewEncapsulation} from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from "@angular/material/dialog";
import {FormBuilder, Validators, FormGroup} from "@angular/forms";
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-mouvement-dialog',
  templateUrl: './mouvement-dialog.component.html',
  styleUrls: ['./mouvement-dialog.component.css']
})

export class MouvementDialogComponent implements OnInit {
  public mouvement: Mouvement = new Mouvement();

    constructor(
    private mouvementsService: MouvementsService,
    public dialogRef: MatDialogRef<MouvementDialogComponent>,
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
      if(this.data.mouvement_id != '') this.mouvementsService.updateMouvement(this.mouvement).subscribe(result => { });
      else this.mouvementsService.addMouvement(this.mouvement).subscribe(result => { });
      this.dialogRef.close(true);
   }

  close() {
    this.dialogRef.close(null);
  }

}

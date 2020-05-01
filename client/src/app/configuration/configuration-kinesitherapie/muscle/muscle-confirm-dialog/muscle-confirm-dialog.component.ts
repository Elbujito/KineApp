import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

import {MusclesService} from '../../../../shared/services/muscles.service';
import {Muscle} from '../../../../shared/models/muscle.model';
import { NgForm } from '@angular/forms';

import {FormBuilder, Validators, FormGroup} from "@angular/forms";

@Component({
  selector: 'app-muscle-confirm-dialog',
  templateUrl: './muscle-confirm-dialog.component.html',
  styleUrls: ['./muscle-confirm-dialog.component.css']
})
export class MuscleConfirmDialogComponent implements OnInit {
  public muscle: Muscle;

    constructor(private musclesService: MusclesService,
    public dialogRef: MatDialogRef<MuscleConfirmDialogComponent>,
      @Inject(MAT_DIALOG_DATA) public data: any) {
    }

  ngOnInit() {
     if(this.data.muscle_id != '')
      {
        this.musclesService.getMuscleById(this.data.muscle_id).subscribe(muscle => {
        this.muscle = muscle;
      });
     }
  }

  public onSubmit() {
      this.dialogRef.close(true);
      this.musclesService.removeMuscle(this.muscle).subscribe(result => { });
   }

  close() {
    this.dialogRef.close(null);
  }

}

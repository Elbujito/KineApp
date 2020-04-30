import {MusclesService} from '../../../shared/services/muscles.service';
import {Muscle} from '../../../shared/models/muscle.model';

import {Component, Inject, OnInit, ViewEncapsulation} from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from "@angular/material/dialog";
import {FormBuilder, Validators, FormGroup} from "@angular/forms";
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-muscle-dialog',
  templateUrl: './muscle-dialog.component.html',
  styleUrls: ['./muscle-dialog.component.css']
})

export class MuscleDialogComponent implements OnInit {
  public muscle: Muscle = new Muscle();

    constructor(
    private musclesService: MusclesService,
    public dialogRef: MatDialogRef<MuscleDialogComponent>,
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
      if(this.data.muscle_id != '') this.musclesService.updateMuscle(this.muscle).subscribe(result => { });
      else this.musclesService.addMuscle(this.muscle).subscribe(result => { });
      this.dialogRef.close(true);
   }

  close() {
    this.dialogRef.close(null);
  }

}

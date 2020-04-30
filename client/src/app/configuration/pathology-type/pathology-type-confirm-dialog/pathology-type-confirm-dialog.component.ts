import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

import {PathologyTypesService} from '../../../shared/services/pathology-types.service';
import {PathologyType} from '../../../shared/models/pathology-type.model';
import { NgForm } from '@angular/forms';

import {FormBuilder, Validators, FormGroup} from "@angular/forms";

@Component({
  selector: 'app-pathology-type-confirm-dialog',
  templateUrl: './pathology-type-confirm-dialog.component.html',
  styleUrls: ['./pathology-type-confirm-dialog.component.css']
})
export class PathologyTypeConfirmDialogComponent implements OnInit {
  public pathologyType: PathologyType;

    constructor(private pathologyTypesService: PathologyTypesService,
    public dialogRef: MatDialogRef<PathologyTypeConfirmDialogComponent>,
      @Inject(MAT_DIALOG_DATA) public data: any) {
    }

  ngOnInit() {
     if(this.data.pathologyType_id != '')
      {
        this.pathologyTypesService.getPathologyTypeById(this.data.pathologyType_id).subscribe(pathologyType => {
        this.pathologyType = pathologyType;
      });
     }
  }

  public onSubmit() {
      this.dialogRef.close(true);
      this.pathologyTypesService.removePathologyType(this.pathologyType).subscribe(result => { });
   }

  close() {
    this.dialogRef.close(null);
  }

}

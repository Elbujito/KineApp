import {PathologyTypesService} from '../../../shared/services/pathology-types.service';
import {PathologyType} from '../../../shared/models/pathology-type.model';

import {Component, Inject, OnInit, ViewEncapsulation} from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from "@angular/material/dialog";
import {FormBuilder, Validators, FormGroup} from "@angular/forms";
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-pathology-type-dialog',
  templateUrl: './pathology-type-dialog.component.html',
  styleUrls: ['./pathology-type-dialog.component.css']
})

export class PathologyTypeDialogComponent implements OnInit {
  public pathologyType: PathologyType = new PathologyType();

    constructor(
    private pathologyTypesService: PathologyTypesService,
    public dialogRef: MatDialogRef<PathologyTypeDialogComponent>,
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
      if(this.data.pathologyType_id != '') this.pathologyTypesService.updatePathologyType(this.pathologyType).subscribe(result => { });
      else this.pathologyTypesService.addPathologyType(this.pathologyType).subscribe(result => { });
      this.dialogRef.close(true);
   }

  close() {
    this.dialogRef.close(null);
  }

}

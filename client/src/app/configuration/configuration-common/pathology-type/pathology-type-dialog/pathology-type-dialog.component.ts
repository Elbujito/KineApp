import { NoteTemplate, PathologyType } from '../../../../shared/models/index';
import { NoteTemplatesService, PathologyTypesService } from '../../../../shared/services/index';

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
  public noteTemplates: NoteTemplate[] = [];

    constructor(
    private pathologyTypesService: PathologyTypesService,
    private noteTemplatesService: NoteTemplatesService,
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

      this.noteTemplatesService.getNoteTemplates().subscribe((noteTemplates: NoteTemplate[]) => {
             this.noteTemplates = noteTemplates;
      });
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

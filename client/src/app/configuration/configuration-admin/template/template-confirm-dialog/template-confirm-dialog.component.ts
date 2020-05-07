import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

import { NoteTemplate } from '../../../../shared/models/index';
import { NoteTemplatesService } from '../../../../shared/services/index';
import { NgForm } from '@angular/forms';

import {FormBuilder, Validators, FormGroup} from "@angular/forms";

@Component({
  selector: 'app-template-confirm-dialog',
  templateUrl: './template-confirm-dialog.component.html',
  styleUrls: ['./template-confirm-dialog.component.css']
})
export class TemplateConfirmDialogComponent implements OnInit {
  public template: NoteTemplate;

    constructor(private noteTemplatesService: NoteTemplatesService,
    public dialogRef: MatDialogRef<TemplateConfirmDialogComponent>,
      @Inject(MAT_DIALOG_DATA) public data: any) {
    }

  ngOnInit() {
     if(this.data.noteTemplate_id != '')
      {
        this.noteTemplatesService.getNoteTemplateById(this.data.template_id).subscribe(template => {
        this.template = template;
      });
     }
  }

  public onSubmit() {
      this.dialogRef.close(true);
      this.noteTemplatesService.removeNoteTemplate(this.template).subscribe(result => { });
   }

  close() {
    this.dialogRef.close(null);
  }

}

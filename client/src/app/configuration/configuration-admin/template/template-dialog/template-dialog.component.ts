import { NoteTemplate } from '../../../../shared/models/index';
import { NoteTemplatesService } from '../../../../shared/services/index';

import {Component, Inject, OnInit, ViewEncapsulation} from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from "@angular/material/dialog";
import {FormBuilder, Validators, FormGroup} from "@angular/forms";
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-template-dialog',
  templateUrl: './template-dialog.component.html',
  styleUrls: ['./template-dialog.component.css']
})

export class TemplateDialogComponent implements OnInit {
  public noteTemplate: NoteTemplate = new NoteTemplate();

    constructor(
    private noteTemplatesService: NoteTemplatesService,
    public dialogRef: MatDialogRef<TemplateDialogComponent>,
      @Inject(MAT_DIALOG_DATA) public data: any) {
    }

  ngOnInit() {
      if(this.data.template_id != '')
      {
        this.noteTemplatesService.getNoteTemplateById(this.data.template_id).subscribe(noteTemplate => {
          this.noteTemplate = noteTemplate;
        });
      }
  }

   public onSubmit() {
      if(this.data.template_id != '') this.noteTemplatesService.updateNoteTemplate(this.noteTemplate).subscribe(result => { });
      else this.noteTemplatesService.addNoteTemplate(this.noteTemplate).subscribe(result => { });
      this.dialogRef.close(true);
   }

  close() {
    this.dialogRef.close(null);
  }

}

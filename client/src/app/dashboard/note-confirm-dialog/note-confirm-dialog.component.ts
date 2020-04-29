import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

import {NotesService} from '../../shared/services/index';
import {Note} from '../../shared/models/index';
import { NgForm } from '@angular/forms';

import {FormBuilder, Validators, FormGroup} from "@angular/forms";

@Component({
  selector: 'app-note-confirm-dialog',
  templateUrl: './note-confirm-dialog.component.html',
  styleUrls: ['./note-confirm-dialog.component.css']
})
export class NoteConfirmDialogComponent implements OnInit {
  public note: Note;

    constructor(private notesService: NotesService,
    public dialogRef: MatDialogRef<NoteConfirmDialogComponent>,
      @Inject(MAT_DIALOG_DATA) public data: any) {
    }

  ngOnInit() {
     if(this.data.note_id != '')
      {
        this.notesService.getNoteById(this.data.note_id).subscribe(note => {
        this.note = note;
      });
     }
  }

  public onSubmit() {
      this.dialogRef.close(true);
      this.notesService.removeNote(this.note).subscribe(result => { });
   }

  close() {
    this.dialogRef.close(null);
  }

}

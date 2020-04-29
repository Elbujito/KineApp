import {NotesService} from '../../shared/services/index';
import {Note} from '../../shared/models/index';

import {Component, Inject, OnInit, ViewEncapsulation} from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from "@angular/material/dialog";
import {FormBuilder, Validators, FormGroup} from "@angular/forms";
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-note-dialog',
  templateUrl: './note-dialog.component.html',
  styleUrls: ['./note-dialog.component.css']
})

export class NoteDialogComponent implements OnInit {
  public note: Note = new Note();

    constructor(
    private notesService: NotesService,
    public dialogRef: MatDialogRef<NoteDialogComponent>,
      @Inject(MAT_DIALOG_DATA) public data: any) {
    }

  ngOnInit() {
      if(this.data.note_id != -1)
      {
        this.notesService.getNoteById(this.data.note_id).subscribe(note => {
          this.note = note;
        });
      }
  }

   public onSubmit() {
      if(this.data.note_id != -1) this.notesService.updateNote(this.note).subscribe(result => { });
      else
	  {
		  this.note.patientId = this.data.patient_id;
		  this.note.id = -1;
		  console.log("Patient id is : ",this.note.patientId);
		  this.notesService.addNote(this.note).subscribe(result => { });
	  }
      this.dialogRef.close(true);
   }

  close() {
    this.dialogRef.close(null);
  }

}

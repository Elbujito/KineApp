import { Router, ActivatedRoute } from '@angular/router';
import { ViewChild, OnInit, Input, Component, Output, EventEmitter, ChangeDetectorRef } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { MatDialog, MatDialogConfig} from "@angular/material/dialog";

import { NoteDialogComponent } from '../note-dialog/note-dialog.component';
import { NoteConfirmDialogComponent } from '../note-confirm-dialog/note-confirm-dialog.component';

import { Note, Patient } from '../../shared/models/index';
import { NotesService } from '../../shared/services/index';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})

export class DashboardComponent implements OnInit {

  displayedColumns: string[] = ['title', 'date', 'description','edit', 'remove'];
  dataSource = new MatTableDataSource<Note>([]);

  @Input('patientOutput') patient: Patient;

  @ViewChild(MatSort, { static: true }) sort: MatSort;

  constructor(private router: Router, private dialog: MatDialog,
  private notesService: NotesService,
  private changeDetectorRefs: ChangeDetectorRef)
  {
    let notes: Note[] = [];
    this.dataSource.data = notes;
  }

  ngOnInit() {
	this.refresh();
  }

  applyFilter(event: Event) {
	const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  openDialog() {
	const dialogRef = this.dialog.open(NoteDialogComponent,{
		data:{dialogTitle: 'Add a new note',
		note_id: -1,
		patient_id: this.patient.id}
		});
        dialogRef.afterClosed().subscribe(result => {
		this.refresh();
		});
  }

  remove(note: Note)
  {
	  const dialogRef = this.dialog.open(NoteConfirmDialogComponent, {
		  data: {dialogTitle: 'Delete the note '+ this.patient.displayedName + '?',
		  note_id: note.id}
		  });
	  dialogRef.afterClosed().subscribe(result => {
		  this.refresh();
		  });
  }

  edit(note: Note)
  {
	  const dialogRef = this.dialog.open(NoteDialogComponent, {
		  data: {dialogTitle: 'Edit a patient',
		  note_id: note.id,
		  patient_id: this.patient.id}
		  });
      dialogRef.afterClosed().subscribe(result => {
		  this.refresh();
		  });
  }

  refresh() {
  if(this.patient !==undefined)
  {
	  this.notesService.getNotesByPatientId(String(this.patient.id)).subscribe((notes: Note[]) => {
		  this.dataSource.data = notes;
		  this.changeDetectorRefs.detectChanges();
          });
   }
  }

  onRequestNotes(patient: Patient)
  {
  console.log("onRequestNotes", patient.displayedName);
    this.patient = patient;
    if(this.patient !==undefined)
    {
  	  this.notesService.getNotesByPatientId(String(patient.id)).subscribe((notes: Note[]) => {
  		  this.dataSource.data = notes;
  		  this.changeDetectorRefs.detectChanges();
            });
     }
  }
}

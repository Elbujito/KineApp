import { Router, ActivatedRoute } from '@angular/router';
import { ViewChild, OnInit, Input, Component, Output, EventEmitter, ChangeDetectorRef } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { MatDialog, MatDialogConfig} from "@angular/material/dialog";

import { TemplateDialogComponent } from '../template-dialog/template-dialog.component';
import { TemplateConfirmDialogComponent } from '../template-confirm-dialog/template-confirm-dialog.component';

import { NoteTemplate } from '../../../../shared/models/index';
import { NoteTemplatesService } from '../../../../shared/services/index';

@Component({
  selector: 'app-template-list',
  templateUrl: './template-list.component.html',
  styleUrls: ['./template-list.component.css']
})

export class TemplateListComponent implements OnInit {

  displayedColumns: string[] = ['name', 'edit', 'remove'];
  dataSource = new MatTableDataSource<NoteTemplate>([]);

  @ViewChild(MatSort, { static: true }) sort: MatSort;

  constructor(private router: Router, private dialog: MatDialog,
  private noteTemplatesService: NoteTemplatesService,
  private changeDetectorRefs: ChangeDetectorRef)
  {
     this.noteTemplatesService.getNoteTemplates().subscribe((noteTemplates: NoteTemplate[]) => {
		 this.dataSource.data = noteTemplates;
		 });
  }

  ngOnInit() {
	this.refresh();
  }

  applyFilter(event: Event) {
	const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  openDialog() {
	const dialogRef = this.dialog.open(TemplateDialogComponent,{
		data:{dialogTitle: 'Ajouter un nouveau template',
		template_id: ''}
		});
    dialogRef.afterClosed().subscribe(result => {
		this.refresh();
		});
  }

  remove(noteTemplate: NoteTemplate)
  {
	  const dialogRef = this.dialog.open(TemplateConfirmDialogComponent, {
		  data: {dialogTitle: 'Supprimer ce template '+ noteTemplate.name +' ?',
		  template_id: noteTemplate.id}
		  });
	  dialogRef.afterClosed().subscribe(result => {
		  this.refresh();
		  });
  }

  edit(noteTemplate: NoteTemplate)
  {
	  const dialogRef = this.dialog.open(TemplateDialogComponent, {
		  data: {dialogTitle: 'Modifier ce template',
		  template_id: noteTemplate.id}
		  });
      dialogRef.afterClosed().subscribe(result => {
		  this.refresh();
		  });
  }

  refresh() {
	  this.noteTemplatesService.getNoteTemplates().subscribe((noteTemplates: NoteTemplate[]) => {
		  this.dataSource.data = noteTemplates;
		  this.changeDetectorRefs.detectChanges();
          });
  }
}

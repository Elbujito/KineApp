import { Router, ActivatedRoute } from '@angular/router';
import { ViewChild, OnInit, Input, Component, Output, EventEmitter, ChangeDetectorRef } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { MatDialog, MatDialogConfig} from "@angular/material/dialog";

import { PathologyTypeDialogComponent } from '../pathology-type-dialog/pathology-type-dialog.component';
import { PathologyTypeConfirmDialogComponent } from '../pathology-type-confirm-dialog/pathology-type-confirm-dialog.component';

import { PathologyType, NoteTemplate } from '../../../../shared/models/index';
import { PathologyTypesService } from '../../../../shared/services/index';

@Component({
  selector: 'app-pathology-type-list',
  templateUrl: './pathology-type-list.component.html',
  styleUrls: ['./pathology-type-list.component.css']
})

export class PathologyTypeListComponent implements OnInit {

  displayedColumns: string[] = ['name', 'template', 'observation', 'level', 'edit', 'remove'];
  dataSource = new MatTableDataSource<PathologyType>([]);
  @ViewChild(MatSort, { static: true }) sort: MatSort;

  constructor(private router: Router, private dialog: MatDialog,
  private pathologyTypesService: PathologyTypesService,
  private changeDetectorRefs: ChangeDetectorRef)
  {
     this.pathologyTypesService.getPathologyTypes().subscribe((pathologyTypes: PathologyType[]) => {
		 this.dataSource.data = pathologyTypes;
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
	const dialogRef = this.dialog.open(PathologyTypeDialogComponent,{
		data:{dialogTitle: 'Ajouter une nouvelle type de pathologie',
		pathologyType_id: ''}
		});
    dialogRef.afterClosed().subscribe(result => {
		this.refresh();
		});
  }

  remove(pathologyType: PathologyType)
  {
	  const dialogRef = this.dialog.open(PathologyTypeConfirmDialogComponent, {
		  data: {dialogTitle: 'Supprimer cette type de pathologie '+ pathologyType.name + ' ?',
		  pathologyType_id: pathologyType.id}
		  });
	  dialogRef.afterClosed().subscribe(result => {
		  this.refresh();
		  });
  }

  edit(pathologyType: PathologyType)
  {
	  const dialogRef = this.dialog.open(PathologyTypeDialogComponent, {
		  data: {dialogTitle: 'Modifier la type de pathologie',
		  pathologyType_id: pathologyType.id}
		  });
      dialogRef.afterClosed().subscribe(result => {
		  this.refresh();
		  });
  }

  refresh() {
	  this.pathologyTypesService.getPathologyTypes().subscribe((pathologyTypes: PathologyType[]) => {
		  this.dataSource.data = pathologyTypes;
		  this.changeDetectorRefs.detectChanges();
          });
  }
}

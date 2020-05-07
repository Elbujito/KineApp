import { Router, ActivatedRoute } from '@angular/router';
import { ViewChild, OnInit, Input, Component, Output, EventEmitter, ChangeDetectorRef } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { MatDialog, MatDialogConfig} from "@angular/material/dialog";

import { MuscleDialogComponent } from '../muscle-dialog/muscle-dialog.component';
import { MuscleConfirmDialogComponent } from '../muscle-confirm-dialog/muscle-confirm-dialog.component';

import { Muscle } from '../../../../shared/models/index';
import { MusclesService } from '../../../../shared/services/index';

@Component({
  selector: 'app-muscle-list',
  templateUrl: './muscle-list.component.html',
  styleUrls: ['./muscle-list.component.css']
})

export class MuscleListComponent implements OnInit {

  displayedColumns: string[] = ['name', 'edit', 'remove'];
  dataSource = new MatTableDataSource<Muscle>([]);

  @ViewChild(MatSort, { static: true }) sort: MatSort;

  constructor(private router: Router, private dialog: MatDialog,
  private musclesService: MusclesService,
  private changeDetectorRefs: ChangeDetectorRef)
  {
     this.musclesService.getMuscles().subscribe((muscles: Muscle[]) => {
		 this.dataSource.data = muscles;
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
	const dialogRef = this.dialog.open(MuscleDialogComponent,{
		data:{dialogTitle: 'Ajouter un nouveau muscle',
		muscle_id: ''}
		});
    dialogRef.afterClosed().subscribe(result => {
		this.refresh();
		});
  }

  remove(muscle: Muscle)
  {
	  const dialogRef = this.dialog.open(MuscleConfirmDialogComponent, {
		  data: {dialogTitle: 'Supprimer ce muscle '+ muscle.name +' ?',
		  muscle_id: muscle.id}
		  });
	  dialogRef.afterClosed().subscribe(result => {
		  this.refresh();
		  });
  }

  edit(muscle: Muscle)
  {
	  const dialogRef = this.dialog.open(MuscleDialogComponent, {
		  data: {dialogTitle: 'Modifier un muscle',
		  muscle_id: muscle.id}
		  });
      dialogRef.afterClosed().subscribe(result => {
		  this.refresh();
		  });
  }

  refresh() {
	  this.musclesService.getMuscles().subscribe((muscles: Muscle[]) => {
		  this.dataSource.data = muscles;
		  this.changeDetectorRefs.detectChanges();
          });
  }
}

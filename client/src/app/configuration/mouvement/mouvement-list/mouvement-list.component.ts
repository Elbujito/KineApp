import { Router, ActivatedRoute } from '@angular/router';
import { ViewChild, OnInit, Input, Component, Output, EventEmitter, ChangeDetectorRef } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { MatDialog, MatDialogConfig} from "@angular/material/dialog";

import { MouvementDialogComponent } from '../mouvement-dialog/mouvement-dialog.component';
import { MouvementConfirmDialogComponent } from '../mouvement-confirm-dialog/mouvement-confirm-dialog.component';

import { Mouvement } from '../../../shared/models/index';
import { MouvementsService } from '../../../shared/services/index';

@Component({
  selector: 'app-mouvement-list',
  templateUrl: './mouvement-list.component.html',
  styleUrls: ['./mouvement-list.component.css']
})

export class MouvementListComponent implements OnInit {

  displayedColumns: string[] = ['name', 'edit', 'remove'];
  dataSource = new MatTableDataSource<Mouvement>([]);

  @ViewChild(MatSort, { static: true }) sort: MatSort;

  constructor(private router: Router, private dialog: MatDialog,
  private mouvementsService: MouvementsService,
  private changeDetectorRefs: ChangeDetectorRef)
  {
     this.mouvementsService.getMouvements().subscribe((mouvements: Mouvement[]) => {
		 this.dataSource.data = mouvements;
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
	const dialogRef = this.dialog.open(MouvementDialogComponent,{
		data:{dialogTitle: 'Ajouter un nouveau mouvement',
		mouvement_id: ''}
		});
    dialogRef.afterClosed().subscribe(result => {
		this.refresh();
		});
  }

  remove(mouvement: Mouvement)
  {
	  const dialogRef = this.dialog.open(MouvementConfirmDialogComponent, {
		  data: {dialogTitle: 'Supprimer ce mouvement '+ mouvement.name +' ?',
		  mouvement_id: mouvement.id}
		  });
	  dialogRef.afterClosed().subscribe(result => {
		  this.refresh();
		  });
  }

  edit(mouvement: Mouvement)
  {
	  const dialogRef = this.dialog.open(MouvementDialogComponent, {
		  data: {dialogTitle: 'Modifier un mouvement',
		  mouvement_id: mouvement.id}
		  });
      dialogRef.afterClosed().subscribe(result => {
		  this.refresh();
		  });
  }

  refresh() {
	  this.mouvementsService.getMouvements().subscribe((mouvements: Mouvement[]) => {
		  this.dataSource.data = mouvements;
		  this.changeDetectorRefs.detectChanges();
          });
  }
}

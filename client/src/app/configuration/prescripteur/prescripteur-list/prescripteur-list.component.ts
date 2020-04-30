import { Router, ActivatedRoute } from '@angular/router';
import { ViewChild, OnInit, Input, Component, Output, EventEmitter, ChangeDetectorRef } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { MatDialog, MatDialogConfig} from "@angular/material/dialog";

import { PrescripteurDialogComponent } from '../prescripteur-dialog/prescripteur-dialog.component';
import { PrescripteurConfirmDialogComponent } from '../prescripteur-confirm-dialog/prescripteur-confirm-dialog.component';

import { Prescripteur } from '../../../shared/models/index';
import { PrescripteursService } from '../../../shared/services/index';

@Component({
  selector: 'app-prescripteur-list',
  templateUrl: './prescripteur-list.component.html',
  styleUrls: ['./prescripteur-list.component.css']
})

export class PrescripteurListComponent implements OnInit {

  displayedColumns: string[] = ['name', 'company', 'email','phoneNumber', 'edit', 'remove'];
  dataSource = new MatTableDataSource<Prescripteur>([]);

  @ViewChild(MatSort, { static: true }) sort: MatSort;

  constructor(private router: Router, private dialog: MatDialog,
  private prescripteursService: PrescripteursService,
  private changeDetectorRefs: ChangeDetectorRef)
  {
     this.prescripteursService.getPrescripteurs().subscribe((prescripteurs: Prescripteur[]) => {
		 this.dataSource.data = prescripteurs;
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
	const dialogRef = this.dialog.open(PrescripteurDialogComponent,{
		data:{dialogTitle: 'Ajouter un nouveau prescripteur',
		prescripteur_id: ''}
		});
    dialogRef.afterClosed().subscribe(result => {
		this.refresh();
		});
  }

  remove(prescripteur: Prescripteur)
  {
	  const dialogRef = this.dialog.open(PrescripteurConfirmDialogComponent, {
		  data: {dialogTitle: 'Supprimer ce prescripteur '+ prescripteur.name + ' ?',
		  prescripteur_id: prescripteur.id}
		  });
	  dialogRef.afterClosed().subscribe(result => {
		  this.refresh();
		  });
  }

  edit(prescripteur: Prescripteur)
  {
	  const dialogRef = this.dialog.open(PrescripteurDialogComponent, {
		  data: {dialogTitle: 'Modifier un prescripteur',
		  prescripteur_id: prescripteur.id}
		  });
      dialogRef.afterClosed().subscribe(result => {
		  this.refresh();
		  });
  }

  refresh() {
	  this.prescripteursService.getPrescripteurs().subscribe((prescripteurs: Prescripteur[]) => {
		  this.dataSource.data = prescripteurs;
		  this.changeDetectorRefs.detectChanges();
          });
  }
}

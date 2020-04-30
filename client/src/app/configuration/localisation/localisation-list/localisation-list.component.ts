import { Router, ActivatedRoute } from '@angular/router';
import { ViewChild, OnInit, Input, Component, Output, EventEmitter, ChangeDetectorRef } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { MatDialog, MatDialogConfig} from "@angular/material/dialog";

import { LocalisationDialogComponent } from '../localisation-dialog/localisation-dialog.component';
import { LocalisationConfirmDialogComponent } from '../localisation-confirm-dialog/localisation-confirm-dialog.component';

import { Localisation } from '../../../shared/models/index';
import { LocalisationsService } from '../../../shared/services/index';

@Component({
  selector: 'app-localisation-list',
  templateUrl: './localisation-list.component.html',
  styleUrls: ['./localisation-list.component.css']
})

export class LocalisationListComponent implements OnInit {

  displayedColumns: string[] = ['name', 'sousLocalisation', 'edit', 'remove'];
  dataSource = new MatTableDataSource<Localisation>([]);

  @ViewChild(MatSort, { static: true }) sort: MatSort;

  constructor(private router: Router, private dialog: MatDialog,
  private localisationsService: LocalisationsService,
  private changeDetectorRefs: ChangeDetectorRef)
  {
     this.localisationsService.getLocalisations().subscribe((localisations: Localisation[]) => {
		 this.dataSource.data = localisations;
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
	const dialogRef = this.dialog.open(LocalisationDialogComponent,{
		data:{dialogTitle: 'Ajouter une nouvelle localisation',
		localisation_id: ''}
		});
    dialogRef.afterClosed().subscribe(result => {
		this.refresh();
		});
  }

  remove(localisation: Localisation)
  {
	  const dialogRef = this.dialog.open(LocalisationConfirmDialogComponent, {
		  data: {dialogTitle: 'Supprimer cette localisation '+ localisation.name +' ?',
		  localisation_id: localisation.id}
		  });
	  dialogRef.afterClosed().subscribe(result => {
		  this.refresh();
		  });
  }

  edit(localisation: Localisation)
  {
	  const dialogRef = this.dialog.open(LocalisationDialogComponent, {
		  data: {dialogTitle: 'Modifier cette localisation',
		  localisation_id: localisation.id}
		  });
      dialogRef.afterClosed().subscribe(result => {
		  this.refresh();
		  });
  }

  refresh() {
	  this.localisationsService.getLocalisations().subscribe((localisations: Localisation[]) => {
		  this.dataSource.data = localisations;
		  this.changeDetectorRefs.detectChanges();
          });
  }
}

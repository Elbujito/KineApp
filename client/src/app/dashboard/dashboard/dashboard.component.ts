import { Router, ActivatedRoute } from '@angular/router';
import { ViewChild, OnInit, Input, Component, Output, EventEmitter, ChangeDetectorRef } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { MatDialog, MatDialogConfig} from "@angular/material/dialog";

import { BilanDialogComponent } from '../bilan-dialog/bilan-dialog.component';
import { BilanConfirmDialogComponent } from '../bilan-confirm-dialog/bilan-confirm-dialog.component';

import { Bilan, Patient } from '../../shared/models/index';
import { BilansService } from '../../shared/services/index';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})

export class DashboardComponent implements OnInit {

  displayedColumns: string[] = ['title', 'date', 'description','edit', 'remove'];
  dataSource = new MatTableDataSource<Bilan>([]);

  @Input('patientOutput') patient: Patient;

  @ViewChild(MatSort, { static: true }) sort: MatSort;

  constructor(private router: Router, private dialog: MatDialog,
  private bilansService: BilansService,
  private changeDetectorRefs: ChangeDetectorRef)
  {
    let bilans: Bilan[] = [];
    this.dataSource.data = bilans;
  }

  ngOnInit() {
	this.refresh();
  }

  applyFilter(event: Event) {
	const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  openDialog() {
	const dialogRef = this.dialog.open(BilanDialogComponent,{
		data:{dialogTitle: 'Add a new bilan',
		bilan_id: -1,
		patient_id: this.patient.id}
		});
        dialogRef.afterClosed().subscribe(result => {
		this.refresh();
		});
  }

  remove(bilan: Bilan)
  {
	  const dialogRef = this.dialog.open(BilanConfirmDialogComponent, {
		  data: {dialogTitle: 'Delete the bilan '+ this.patient.displayedName + '?',
		  bilan_id: bilan.id}
		  });
	  dialogRef.afterClosed().subscribe(result => {
		  this.refresh();
		  });
  }

  edit(bilan: Bilan)
  {
	  const dialogRef = this.dialog.open(BilanDialogComponent, {
		  data: {dialogTitle: 'Edit a patient',
		  bilan_id: bilan.id,
		  patient_id: this.patient.id}
		  });
      dialogRef.afterClosed().subscribe(result => {
		  this.refresh();
		  });
  }

  refresh() {
  if(this.patient !==undefined)
  {
	  this.bilansService.getBilansByPatientId(String(this.patient.id)).subscribe((bilans: Bilan[]) => {
		  this.dataSource.data = bilans;
		  this.changeDetectorRefs.detectChanges();
          });
   }
  }

  onRequestBilans(patient: Patient)
  {
  console.log("onRequestBilans", patient.displayedName);
    this.patient = patient;
    if(this.patient !==undefined)
    {
  	  this.bilansService.getBilansByPatientId(String(patient.id)).subscribe((bilans: Bilan[]) => {
  		  this.dataSource.data = bilans;
  		  this.changeDetectorRefs.detectChanges();
            });
     }
  }
}

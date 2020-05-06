import { Router, ActivatedRoute, NavigationExtras } from '@angular/router';
import { ViewChild, OnInit, Input, Component, Output, EventEmitter, ChangeDetectorRef } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { MatDialog } from "@angular/material/dialog";
import { Pathology, PathologyType, Patient } from '../../shared/models/index';
import { PatientsService, PathologiesService, PathologyTypesService } from '../../shared/services/index';

import {PathologyDialogComponent} from '../pathology/pathology-dialog/pathology-dialog.component';
import {PathologyConfirmDialogComponent} from '../pathology/pathology-confirm-dialog/pathology-confirm-dialog.component';
@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})

export class DashboardComponent implements OnInit {

  displayedColumns: string[] = ['pathologyType', 'name','createdAt','lastModification', 'active', 'launch', 'remove'];
  dataSource = new MatTableDataSource<Pathology>([]);

  @Input('patientOutput') patient: Patient;

  @ViewChild(MatSort, { static: true }) sort: MatSort;

  constructor(private router: Router, private route: ActivatedRoute,private dialog: MatDialog,
  private pathologiesService: PathologiesService,
  private pathologyTypesService: PathologyTypesService,
  private patientsService: PatientsService,
  private changeDetectorRefs: ChangeDetectorRef)
  {
    let pathologies: Pathology[] = [];
    this.dataSource.data = pathologies;
  }

  ngOnInit() {
	  this.refresh();
  }

  launch(pathology: Pathology)
  {
     let navigationExtras: NavigationExtras = {
     queryParams: {
                  'pathology_id': pathology.id,
                  'patient_id': this.patient.id
              }
     };
     this.router.navigate(['consultation'], navigationExtras);
  }

  refresh() {
  if(this.patient !==undefined)
  {
	  this.patientsService.getPatientById(this.patient.id).subscribe((patient: Patient) => {
		  this.dataSource.data = patient.pathologies;
		  this.changeDetectorRefs.detectChanges();
          });
   }
  }

  onRequestPathologies(patient: Patient)
  {
      this.patient = patient;
      this.refresh();
  }

    applyFilter(event: Event) {
  	const filterValue = (event.target as HTMLInputElement).value;
      this.dataSource.filter = filterValue.trim().toLowerCase();
    }

    openDialog() {
  	const dialogRef = this.dialog.open(PathologyDialogComponent,{
  		data:{dialogTitle: 'Ajouter une nouvelle pathologie à '+this.patient.displayedName,
  		patient_id: this.patient.id}
  		});
      dialogRef.afterClosed().subscribe(result => {
  		this.refresh();
  		});
    }

     remove(pathology: Pathology)
     {
     console.log("pathology", pathology);
    	  const dialogRef = this.dialog.open(PathologyConfirmDialogComponent, {
    		  data: {dialogTitle: 'Supprimer cette pathologie '+ pathology.name +' ?',
    		  pathology_id: pathology.id,
    		  patient_id: this.patient.id}
    		  });
    	      dialogRef.afterClosed().subscribe(result => {
    		  this.refresh();
    		  });
      }
}

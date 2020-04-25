import { Router, ActivatedRoute, NavigationEnd, Event as NavigationEvent} from '@angular/router';
import { ViewChild, OnInit, Input, Component, Output, EventEmitter } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Title } from '@angular/platform-browser';
import {MatDialog, MatDialogConfig} from "@angular/material";
import {Observable} from 'rxjs';

import { Patient } from '../../models/patient.model';
import {PatientsService} from '../../services/patients.service';
import {PatientDialogComponent} from '../patient-dialog/patient-dialog.component';
import {ConfirmationDialogComponent} from '../confirmation-dialog/confirmation-dialog.component';

@Component({
  selector: 'app-patient-list',
  templateUrl: './patient-list.component.html',
  styleUrls: ['./patient-list.component.css']
})
export class PatientListComponent implements OnInit {
  displayedColumns: string[] = ['firstname', 'name', 'age', 'weight', 'email', 'edit', 'remove'];
  patients: Patient[];
  dataSource = new MatTableDataSource(this.patients);


  @ViewChild(MatSort, { static: true }) sort: MatSort;

  constructor(private router: Router, private dialog: MatDialog, private patientsService: PatientsService)
  {
  }

  ngOnInit()
  {

   this.patientsService.getAllPatients().subscribe((patients: Patient[]) => {
                                                               this.patients = patients;
                                                             });
    this.dataSource = new MatTableDataSource(this.patients);
    this.dataSource.sort = this.sort;
}

   openDialog() {
   this.dialog.open(PatientDialogComponent, {
             width: '', data: {id: 'id'}}
   );

       /*dialogRef.afterClosed().subscribe(
        data => this.patientsService.addNewPatient(data)
       );*/
    }

    remove(patient: Patient)
    {
     this.dialog.open(ConfirmationDialogComponent);
    }

    edit(patient: Patient)
    {
     }
}

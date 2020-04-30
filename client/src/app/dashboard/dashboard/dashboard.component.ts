import { Router, ActivatedRoute } from '@angular/router';
import { ViewChild, OnInit, Input, Component, Output, EventEmitter, ChangeDetectorRef } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';

import { Pathology, PathologyType, Patient } from '../../shared/models/index';
import { PatientsService, PathologiesService, PathologyTypesService } from '../../shared/services/index';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})

export class DashboardComponent implements OnInit {

  displayedColumns: string[] = ['pathologyType', 'name','createdAt','lastModifcation', 'discover','active', 'launch'];
  dataSource = new MatTableDataSource<Pathology>([]);

  @Input('patientOutput') patient: Patient;

  @ViewChild(MatSort, { static: true }) sort: MatSort;

  constructor(private router: Router, private route: ActivatedRoute,
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
      console.log("onRequestPathologies");
      this.patient = patient;
      this.refresh();
  }
}

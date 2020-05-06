import { Router, ActivatedRoute, NavigationEnd, Event as NavigationEvent} from '@angular/router';
import { OnInit, Input, Component, Output, EventEmitter } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import {Observable} from 'rxjs';
import {startWith, map} from 'rxjs/operators';

import {PathologyTypesService, PatientsService, NotesService, AlertService} from '../../shared/services/index';
import {Patient, Note, PathologyType} from '../../shared/models/index'

@Component({
  selector: 'app-searchbar',
  templateUrl: './searchbar.component.html',
  styleUrls: ['./searchbar.component.css']
})

export class SearchBarComponent implements OnInit {
  control = new FormControl();
  patients: Patient[] = [];
  pathologyTypes: PathologyType[] = [];
  filteredPatients: Observable<Patient[]>;

  @Output() patientOutput = new EventEmitter<Patient>();

  constructor(private router: Router,
  private patientsService: PatientsService,
  private alertService: AlertService,
  private pathologyTypesService: PathologyTypesService
  ) {}

  ngOnInit() {
    this.patientsService.getPatients().subscribe(patients => {
                this.patients = patients;
    });

    this.pathologyTypesService.getPathologyTypes().subscribe(pathologyTypes => {
                 this.pathologyTypes = pathologyTypes;
    });

     this.filteredPatients = this.control.valueChanges
        .pipe(
          startWith(''),
          map(value => typeof value === 'string' ? value : value.displayedName),
          map(displayedName => displayedName ? this._filter(displayedName) : this.patients.slice())
     );
   }

    display(patient: Patient): string {
      return patient && patient.displayedName ? patient.displayedName : '';
    }

    private _filter(displayedName: string): Patient[] {
      const filterValue = displayedName.toLowerCase();
      return this.patients.filter(p => p.displayedName.toLowerCase().indexOf(filterValue) === 0);
  }

  onSubmit() {
    this.patientOutput.emit(this.control.value);
    this.alertService.showToaster("Recherche des pathologies...");
  }
}


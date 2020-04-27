import { Router, ActivatedRoute, NavigationEnd, Event as NavigationEvent} from '@angular/router';
import { OnInit, Input, Component, Output, EventEmitter } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import {Observable} from 'rxjs';
import {startWith, map} from 'rxjs/operators';

import {PatientsService, BilansService} from '../../shared/services/index';
import {Patient, Bilan} from '../../shared/models/index'

@Component({
  selector: 'app-searchbar',
  templateUrl: './searchbar.component.html',
  styleUrls: ['./searchbar.component.css']
})

export class SearchBarComponent implements OnInit {
  control = new FormControl();
  patients: Patient[] = [];
  filteredPatients: Observable<Patient[]>;
  patientSearch: Patient;

  constructor(private router: Router, private patientsService: PatientsService) {}

  ngOnInit() {
    this.patientsService.getAllPatients().subscribe(patients => {
                this.patients = patients;
    });

    this.filteredPatients = this.control.valueChanges.pipe(
          startWith(''),
          map(value => this._filter(value))
    );
  }

  private _filter(value: string): Patient[] {
    const filterValue = this._normalizeValue(value);
    return this.patients.filter(patient => this._normalizeValue(patient.firstname).includes(filterValue));
  }

  private _normalizeValue(value: string): string {
    return value.toLowerCase().replace(/\s/g, '');
  }

  onPatientChanged(patient: Patient)
  {
    this.patientSearch = patient;
  }

  submit() {
  }
}


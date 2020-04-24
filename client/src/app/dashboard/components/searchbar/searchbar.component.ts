import { Router, ActivatedRoute, NavigationEnd, Event as NavigationEvent} from '@angular/router';
import { OnInit, Input, Component, Output, EventEmitter } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import {Observable} from 'rxjs';
import {startWith, map} from 'rxjs/operators';
import {PatientsService} from '../../services/patients.service';
import {BilansService} from '../../services/bilans.service';

import {Patient} from '../../models/patient.model'
import {Bilan} from '../../models/bilan.model'

@Component({
  selector: 'app-searchbar',
  templateUrl: './searchbar.component.html',
  styleUrls: ['./searchbar.component.css']
})

export class SearchBarComponent implements OnInit {
  control = new FormControl();
  patients: Patient[] = [];
  bilans: Bilan[] = [];
  filteredPatients: Observable<Patient[]>;
  searchStarted: Boolean;
  patientSearch: Patient = new Patient();
  bilan: Bilan = new Bilan();

  constructor(private router: Router, private bilansService: BilansService, private patientsService: PatientsService) {}

  ngOnInit() {
    this.bilansService.getAllBilans().subscribe(bilans => {
                  this.bilans = bilans;
    });

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
    return this.patients.filter(patient => this._normalizeValue(patient.name).includes(filterValue));
  }

  private _normalizeValue(value: string): string {
    return value.toLowerCase().replace(/\s/g, '');
  }

  onPatientChanged(patient: Patient)
  {
    this.patientSearch = patient;
  }

  submit() {
      this.searchStarted = true;
          this.bilansService.getBilansByPatientId(this.patientSearch).subscribe(bilans => {
            this.bilans = bilans;
          });

       this.searchStarted = false;
  }

    setMainImgToDefault() {
      this.bilan.backgroundImg = "http://howmadareyou.com/wp-content/themes/MAD/images/default_profile_image.png";
    }
}


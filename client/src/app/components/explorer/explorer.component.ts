import {Component, OnInit} from '@angular/core';
import {MatChipInputEvent, MatDialog} from '@angular/material';
import {FormControl} from '@angular/forms';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/startWith';
import {Router, ActivatedRoute, NavigationEnd, Event as NavigationEvent} from '@angular/router';

import {PatientsService} from '../../services/patients.service';
import {BilansService} from '../../services/bilans.service';

import {Bilan} from '../../classes/bilan';
import {Patient} from '../../classes/patient';

@Component({
  selector: 'app-explorer',
  templateUrl: './explorer.component.html',
  styleUrls: ['./explorer.component.css']
})

export class ExplorerComponent implements OnInit {
  explorerResult: Bilan[];
  explorerStarted: Boolean;
  bilans: Bilan[];
  patients: Patient[];

  pokemonControl: FormControl = new FormControl();

  queryPatient: Patient;

  constructor(private dialog: MatDialog, private route: ActivatedRoute, private router: Router, private bilansService: BilansService, private patientsService: PatientsService) {
  }

  ngOnInit() {
    this.explorerStarted = true;

    this.patientsService.getAllPatients().subscribe(patients => {
      this.patients = patients;
          this.explorerStarted = false;
    });
  }

  exploreBilans() {
   if (this.queryPatient) {
         this.explorerStarted = true;
          this.bilansService.getBilansByPatient(this.queryPatient.id).subscribe(bilans => {
            this.exploreBilansCallback(bilans);
          });
      }
    }

  scrollToResults() {
    setTimeout(function () {
      (<HTMLInputElement>document.getElementById('explorer-result-component')).scrollIntoView({
        behavior: 'smooth',
        block: 'start',
        inline: 'start'
      });
    }, 100);
  }

  exploreBilansCallback(bilans) {
    this.explorerResult = bilans;
    this.explorerStarted = false;
    this.scrollToResults();
  }
}

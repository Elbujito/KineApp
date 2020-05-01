import { Router, ActivatedRoute } from '@angular/router';
import { OnInit, Input, Component, Output, EventEmitter } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';

import { Pathology, PathologyType, Patient } from '../../shared/models/index';
import { PatientsService, PathologiesService, PathologyTypesService } from '../../shared/services/index';

@Component({
  selector: 'app-consultation',
  templateUrl: './consultation.component.html',
  styleUrls: ['./consultation.component.css']
})

export class ConsultationComponent implements OnInit {

  public patient: Patient = new Patient();
  public pathology: Pathology = new Pathology();

  constructor(private router: Router, private route: ActivatedRoute,
              private patientsService: PatientsService, private pathologiesService: PathologiesService )
  {
      let patient_id;
      let pathology_id;
      this.route.queryParams.subscribe(params => {
        patient_id = params['patient_id'];
        pathology_id = params['pathology_id'];
      });

      this.patientsService.getPatientById(patient_id).subscribe((patient: Patient) => {
        this.patient = patient;
      });

      this.pathologiesService.getPathologyById(pathology_id).subscribe((pathology: Pathology) => {
        this.pathology = pathology;
      });
  }

  ngOnInit() {
  }
}

import { Router, ActivatedRoute } from '@angular/router';
import { OnInit, Input, Component, Output, EventEmitter } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { MatTableDataSource } from '@angular/material/table';

import { Pathology, PathologyType, Patient, BilanArticulaire, BilanMusculaire, Localisation, Prescripteur} from '../../shared/models/index';
import { PatientsService, PathologiesService, PathologyTypesService, LocalisationsService, PrescripteursService} from '../../shared/services/index';

@Component({
  selector: 'app-consultation',
  templateUrl: './consultation.component.html',
  styleUrls: ['./consultation.component.css']
})

export class ConsultationComponent implements OnInit {

  public patient: Patient = new Patient();
  public pathology: Pathology = new Pathology();
  public pathologyName: string;
  public prescripteurName: string;
  public localisationName: string;
  public sousLocalisationName: string;
  public pathologyTypeName: string;
  public pathologyTypes: PathologyType[] = [];
  public localisations: Localisation[] = [];
  public prescripteurs: Prescripteur[] = [];

  currentBilanAlgique: string;
  douleurs: string[] = ['1', '2', '3', '4','5', '6', '7', '8','9','10'];

  displayedBilanArticulaireColumns: string[] = ['date_ba', 'name_ba', 'amplitude'];
  displayedBilanMusculaireColumns: string[] = ['date_bm', 'name_bm', 'mouvement'];
  bilanArticulaireDataSource = new MatTableDataSource<BilanArticulaire>([]);
  bilanMusculaireDataSource = new MatTableDataSource<BilanMusculaire>([]);


  constructor(private router: Router, private route: ActivatedRoute,
              private pathologyTypesService: PathologyTypesService,
              private localisationsService: LocalisationsService,
              private prescripteursService: PrescripteursService,
              private patientsService: PatientsService, private pathologiesService: PathologiesService )
  {
      let patient_id;
      let pathology_id;
      this.route.queryParams.subscribe(params => {
        patient_id = params['patient_id'];
        pathology_id = params['pathology_id'];
      });

      this.patientsService.getPatientById(patient_id).subscribe(patient => {
          this.patient = patient;
          this.pathology = this.patient.pathologies.find( pathology => pathology.id === pathology_id);
       });

       this.pathologyTypesService.getPathologyTypes().subscribe(pathologyTypes => {
          this.pathologyTypes = pathologyTypes;
       });

       this.localisationsService.getLocalisations().subscribe(localisations => {
          this.localisations = localisations;
       });

       this.prescripteursService.getPrescripteurs().subscribe(prescripteurs => {
          this.prescripteurs = prescripteurs;
       });

  }

  ngOnInit() {
  }

  applyBilanArticulaireFilter(event: Event) {
      const filterValue = (event.target as HTMLInputElement).value;
      this.bilanArticulaireDataSource.filter = filterValue.trim().toLowerCase();
  }

  applyBilanMusculaireFilter(event: Event) {
        const filterValue = (event.target as HTMLInputElement).value;
        this.bilanMusculaireDataSource.filter = filterValue.trim().toLowerCase();
  }


}

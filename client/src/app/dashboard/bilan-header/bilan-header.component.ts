import { OnInit, Input, Component} from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { DatePipe } from '@angular/common';

import { PathologyType, Pathology, Patient, Localisation, Prescripteur } from '../../shared/models/index';
import { PatientsService, PathologiesService, PathologyTypesService, LocalisationsService, PrescripteursService } from '../../shared/services/index';


@Component({
  selector: 'app-bilan-header',
  templateUrl: './bilan-header.component.html',
  styleUrls: ['./bilan-header.component.css']
})
export class BilanHeaderComponent implements OnInit {

  public pathology: Pathology;
  public patient: Patient;
  public pathologyName: string;
  public prescripteurName: string;
  public localisationName: string;
  public sousLocalisationName: string;
  public pathologyTypeName: string;
  public pathologyTypes: PathologyType[] = [];
  public localisations: Localisation[] = [];
  public prescripteurs: Prescripteur[] = [];
  public startDate = new FormControl(new Date());

  @Input('patient_id') patient_id: number;
  @Input('pathology_id') pathology_id: number;

  constructor(private pathologyTypesService: PathologyTypesService,
              private localisationsService: LocalisationsService,
              private prescripteursService: PrescripteursService,
              private pathologiesService: PathologiesService,
              private patientsService: PatientsService)
  {
  }

  ngOnInit() {

    this.patientsService.getPatientById(this.patient_id).subscribe(patient => {
                  this.patient = patient;
  		this.pathology = patient.pathologies.find(p => p.id === this.pathology_id);
     });

     this.patientsService.getPatientById(this.patient_id).subscribe(patient => {
        this.patient = patient;
        this.pathology = this.patient.pathologies.find( pathology => pathology.id === this.pathology_id);
        this.pathology.formatedCreatedAt= new DatePipe('en-US').transform( this.pathology.createdAt, 'dd/MM/yyyy');
        this.localisationName = this.pathology.localisation.name;
        this.sousLocalisationName = this.pathology.localisation.sousLocalisation;
        this.prescripteurName = this.pathology.prescripteur.name;
        this.pathologyTypeName = this.pathology.pathologyType.name;
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

  onLocalisationChanged(value)
  {
      this.localisationsService.getLocalisations().subscribe(localisations => {
          this.localisations = localisations;
          this.sousLocalisationName = this.localisations.find(l => l.name == value).sousLocalisation;
      });
   }

   onSave()
   {
           this.pathology.createdAt = new Date(this.pathology.formatedCreatedAt);
           this.pathology.lastModification = new Date();
           this.pathology.localisation = this.localisations.find(l => l.name === this.localisationName);
           this.pathology.prescripteur = this.prescripteurs.find(p => p.name === this.prescripteurName);
           this.pathology.pathologyType = this.pathologyTypes.find(pt => pt.name === this.pathologyTypeName);
           this.patient.pathologies[this.pathology.id] = this.pathology
           this.patientsService.updatePatient(this.patient).subscribe(result => { });
   }

}

import { Router, ActivatedRoute } from '@angular/router';
import { Component, OnInit, ChangeDetectorRef} from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { MatDialog } from "@angular/material/dialog";

import { Pathology, PathologyType, Patient, Localisation, Prescripteur} from '../../shared/models/index';
import { BilanAlgiquesService, AlertService, PatientsService, PathologiesService, PathologyTypesService, LocalisationsService, PrescripteursService} from '../../shared/services/index';

import { ConsultationConfirmDialogComponent } from '../consultation-confirm-dialog/consultation-confirm-dialog.component';
import { BilanArticulaireTableComponent } from '../bilan-articulaire-table/bilan-articulaire-table.component';

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
  public startDate = new FormControl(new Date());
  public patient_id: number;
  public pathology_id: number;

  currentBilanAlgique: string;
  douleurs: string[] = ['1', '2', '3', '4','5', '6', '7', '8','9','10'];

  constructor(private router: Router, private route: ActivatedRoute,private dialog: MatDialog,
              private bilanAlgiquesService: BilanAlgiquesService,
              private pathologyTypesService: PathologyTypesService,
              private localisationsService: LocalisationsService,
              private prescripteursService: PrescripteursService,
              private patientsService: PatientsService,
              private pathologiesService: PathologiesService,
              private alertService: AlertService,
              private changeDetectorRefs: ChangeDetectorRef)
  {

      this.route.queryParams.subscribe(params => {
        this.patient_id = params['patient_id'];
        this.pathology_id = params['pathology_id'];
      });

      this.patientsService.getPatientById(this.patient_id).subscribe(patient => {
          this.patient = patient;
          this.pathology = this.patient.pathologies.find( pathology => pathology.id === this.pathology_id);

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


  ngOnInit() {
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
        this.pathology.lastModification = new Date();
        this.pathology.localisation = this.localisations.find(l => l.name === this.localisationName);
        this.pathology.prescripteur = this.prescripteurs.find(p => p.name === this.prescripteurName);
        this.pathology.pathologyType = this.pathologyTypes.find(pt => pt.name === this.pathologyTypeName);
        this.patient.pathologies[this.pathology.id] = this.pathology
        this.patientsService.updatePatient(this.patient).subscribe(result => { });
        this.alertService.showToaster("La pathologie a été sauvergardé");
  }

  onClose()
  {
    	const dialogRef = this.dialog.open(ConsultationConfirmDialogComponent,{
    		data:{dialogTitle: 'Quitter la consultation de '+this.patient.displayedName}
    		});
  }

  onUpdatePathology(pathology: Pathology)
  {

  }
}

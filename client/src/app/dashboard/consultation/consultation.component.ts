import { Router, ActivatedRoute } from '@angular/router';
import { OnInit, Input, Component, Output, EventEmitter,ViewChild, ChangeDetectorRef} from '@angular/core';
import {MatPaginator} from '@angular/material/paginator';
import {MatSort} from '@angular/material/sort';
import { FormGroup, FormControl } from '@angular/forms';
import { MatTableDataSource } from '@angular/material/table';
import { MatDialog } from "@angular/material/dialog";

import { Pathology, PathologyType, Patient, BilanArticulaire, BilanMusculaire, Localisation, Prescripteur} from '../../shared/models/index';
import { BilanAlgiquesService, BilanMusculairesService, BilanArticulairesService, AlertService, PatientsService, PathologiesService, PathologyTypesService, LocalisationsService, PrescripteursService} from '../../shared/services/index';

import { ConsultationConfirmDialogComponent } from '../consultation-confirm-dialog/consultation-confirm-dialog.component';

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

  @ViewChild(MatSort, {static: true}) sort: MatSort;

  currentBilanAlgique: string;
  douleurs: string[] = ['1', '2', '3', '4','5', '6', '7', '8','9','10'];

  displayedBilanArticulaireColumns: string[] = ['date_ba', 'name_ba', 'amplitude', 'remove_ba'];
  displayedBilanMusculaireColumns: string[] = ['date_bm', 'name_bm', 'mouvement', 'remove_bm'];
  bilanArticulaireDataSource = new MatTableDataSource<BilanArticulaire>([]);
  bilanMusculaireDataSource = new MatTableDataSource<BilanMusculaire>([]);


  constructor(private router: Router, private route: ActivatedRoute,private dialog: MatDialog,
              private bilanArticulairesService: BilanArticulairesService,
              private bilanMusculairesService: BilanMusculairesService,
              private bilanAlgiquesService: BilanAlgiquesService,
              private pathologyTypesService: PathologyTypesService,
              private localisationsService: LocalisationsService,
              private prescripteursService: PrescripteursService,
              private patientsService: PatientsService,
              private pathologiesService: PathologiesService,
              private alertService: AlertService,
              private changeDetectorRefs: ChangeDetectorRef)
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

  applyBilanArticulaireFilter(event: Event) {
      const filterValue = (event.target as HTMLInputElement).value;
      this.bilanArticulaireDataSource.filter = filterValue.trim().toLowerCase();

      if (this.bilanArticulaireDataSource.paginator) {
            this.bilanArticulaireDataSource.paginator.firstPage();
      }
  }

  applyBilanMusculaireFilter(event: Event) {
        const filterValue = (event.target as HTMLInputElement).value;
        this.bilanMusculaireDataSource.filter = filterValue.trim().toLowerCase();

        if (this.bilanMusculaireDataSource.paginator) {
            this.bilanMusculaireDataSource.paginator.firstPage();
        }
  }

  addLineBM()
  {
    let bilanMusculaire = new BilanMusculaire();
    this.bilanMusculairesService.addBilanMusculaire(bilanMusculaire).subscribe(result => {
        bilanMusculaire = result;
        this.pathology.bilanMusculaires.push(bilanMusculaire);
        this.bilanMusculaireDataSource.data = this.pathology.bilanMusculaires;
    });
  }

  addLineBA()
  {
     let bilanArticulaire = new BilanArticulaire();
     this.bilanArticulairesService.addBilanArticulaire(bilanArticulaire).subscribe(result => {
          bilanArticulaire = result;
          this.pathology.bilanArticulaires.push(bilanArticulaire);
          this.bilanArticulaireDataSource.data = this.pathology.bilanArticulaires;
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


}

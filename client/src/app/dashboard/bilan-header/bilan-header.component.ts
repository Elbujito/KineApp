import { OnInit, Input, Component, Output, EventEmitter} from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { DatePipe } from '@angular/common';

import { PathologyType, Localisation, Prescripteur } from '../../shared/models/index';
import { PathologyTypesService, LocalisationsService, PrescripteursService } from '../../shared/services/index';

import { BilanHeader } from '../models/index';

@Component({
  selector: 'app-bilan-header',
  templateUrl: './bilan-header.component.html',
  styleUrls: ['./bilan-header.component.css']
})
export class BilanHeaderComponent implements OnInit {

  public prescripteurName: string;
  public localisationName: string;
  public sousLocalisationName: string;
  public pathologyTypeName: string;
  public formatedCreatedAt: string;
  public saved: Boolean;

  public pathologyTypes: PathologyType[] = [];
  public localisations: Localisation[] = [];
  public prescripteurs: Prescripteur[] = [];

  public startDate = new FormControl(new Date());

  @Input('localisation') localisation: Localisation;
  @Input('pathologyType') pathologyType: PathologyType;
  @Input('prescripteur') prescripteur: Prescripteur;
  @Input('createdAt') createdAt: Date;

  @Output() bilanHeaderOutput = new EventEmitter<BilanHeader>();

  constructor(private pathologyTypesService: PathologyTypesService,
              private localisationsService: LocalisationsService,
              private prescripteursService: PrescripteursService)
  {
  }

  ngOnInit() {

    this.saved = true;

     this.pathologyTypesService.getPathologyTypes().subscribe(pathologyTypes => {
        this.pathologyTypes = pathologyTypes;
     });

     this.localisationsService.getLocalisations().subscribe(localisations => {
        this.localisations = localisations;
     });

     this.prescripteursService.getPrescripteurs().subscribe(prescripteurs => {
        this.prescripteurs = prescripteurs;
        this.formatedCreatedAt= new DatePipe('en-US').transform( this.createdAt, 'dd/MM/yyyy');
        this.localisationName = this.localisation.name;
        this.sousLocalisationName = this.localisation.sousLocalisation;
        this.prescripteurName = this.prescripteur.name;
        this.pathologyTypeName = this.pathologyType.name;
     });
  }

  onLocalisationChanged(value)
  {
      this.localisationsService.getLocalisations().subscribe(localisations => {
          this.localisations = localisations;
          this.sousLocalisationName = this.localisations.find(l => l.name == value).sousLocalisation;
          this.saved = false;
      });
   }

   onChange()
   {
      this.saved = false;
   }

   isSaved(): Boolean
   {
      return this.saved;
   }

   save()
   {
       let bilanHeader = new BilanHeader();
       bilanHeader.createdAt = new Date(this.formatedCreatedAt);
       bilanHeader.localisation = this.localisations.find(l => l.name === this.localisationName);
       bilanHeader.prescripteur = this.prescripteurs.find(p => p.name === this.prescripteurName);
       bilanHeader.pathologyType = this.pathologyTypes.find(pt => pt.name === this.pathologyTypeName);
       this.bilanHeaderOutput.emit(bilanHeader);

       this.saved = true;
    }

}

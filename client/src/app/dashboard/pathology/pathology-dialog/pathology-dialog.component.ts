import { Pathology, PathologyType, Localisation} from '../../../shared/models/index';
import { PathologiesService, PathologyTypesService, LocalisationsService } from '../../../shared/services/index';

import {Component, Inject, OnInit, ViewEncapsulation} from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from "@angular/material/dialog";
import {FormBuilder, Validators, FormGroup} from "@angular/forms";
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-pathology-dialog',
  templateUrl: './pathology-dialog.component.html',
  styleUrls: ['./pathology-dialog.component.css']
})

export class PathologyDialogComponent implements OnInit {
  public pathology: Pathology = new Pathology();
  public pathologyTypes: PathologyType[] = [];
  public localisations: Localisation[] = [];
    constructor(
    private pathologiesService: PathologiesService,
    private pathologyTypesService: PathologyTypesService,
    private localisationsService: LocalisationsService,
    public dialogRef: MatDialogRef<PathologyDialogComponent>,
      @Inject(MAT_DIALOG_DATA) public data: any) {
    }

  ngOnInit() {
      if(this.data.pathology_id != '')
      {
        this.pathologiesService.getPathologyById(this.data.pathology_id).subscribe(pathology => {
          this.pathology = pathology;
        });
      }

       this.pathologyTypesService.getPathologyTypes().subscribe(pathologyTypes => {
          this.pathologyTypes = pathologyTypes;
       });

       this.localisationsService.getLocalisations().subscribe(localisations => {
           this.localisations = localisations;
       });
  }

   public onSubmit() {
      if(this.data.pathology_id != '') this.pathologiesService.updatePathologie(this.pathology).subscribe(result => { });
      else this.pathologiesService.addPathologie(this.pathology).subscribe(result => { });
      this.dialogRef.close(true);
   }

  close() {
    this.dialogRef.close(null);
  }

}

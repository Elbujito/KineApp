import {Component, OnInit, Inject} from '@angular/core';

import {ActivatedRoute, Router} from '@angular/router';

import {BilansService} from '../../services/bilans.service';
import {Bilan} from '../../models/bilan.model';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material';


@Component({
  selector: 'app-bilan-dialog',
  templateUrl: './bilan-dialog.component.html',
  styleUrls: ['./bilan-dialog.component.css']
})

export class BilanDialogComponent implements OnInit {
  bilan: Bilan = new Bilan;

  constructor(
  private bilansService: BilansService,
  public dialogRef: MatDialogRef<BilanDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any) {
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  ngOnInit() {
  }

  setMainImgToDefault() {
    this.bilan.backgroundImg = "http://howmadareyou.com/wp-content/themes/MAD/images/default_profile_image.png";
  }

}


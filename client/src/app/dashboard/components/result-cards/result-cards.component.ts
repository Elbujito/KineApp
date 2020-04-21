import {Component, OnInit, OnChanges, SimpleChanges, SimpleChange, Input} from '@angular/core';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material';

import {BilanDialogComponent} from '../bilan-dialog/bilan-dialog.component';

@Component({
  selector: 'app-result-cards',
  templateUrl: './result-cards.component.html',
  styleUrls: ['./result-cards.component.css']
})
export class ResultCardsComponent implements OnInit, OnChanges {

  @Input() bilans: any = [];
  orderBy: String;
  page = 1;

  constructor(private dialog: MatDialog) {
  }

  ngOnChanges(changes: SimpleChanges) {
    this.orderResults();
  }

  openDialog(bilan_id) {
    this.dialog.open(BilanDialogComponent, {
      width: '', data: {'bilan_id': bilan_id}
    });
  }

  orderResults() {
    if (this.bilans) {
      this.bilans = this.bilans.sort((obj1, obj2) => {
        let name1, name2;
        if (this.orderBy === 'nameAsc') {
          name1 = obj1.name.toUpperCase();
          name2 = obj2.name.toUpperCase();
        } else if (this.orderBy === 'nameDesc') {
          name1 = obj2.name.toUpperCase();
          name2 = obj1.name.toUpperCase();
        } else if (this.orderBy === 'rankAsc') {
          name1 = (obj1.rank * 100);
          name2 = (obj2.rank * 100);
        } else if (this.orderBy === 'rankDesc') {
          name1 = (obj2.rank * 100);
          name2 = (obj1.rank * 100);
        }

        let comparison = 0;

        if (name1 > name2) comparison = 1;
        else if (name1 < name2) comparison = -1;

        return comparison;
      });
    }
  }

  ngOnInit() {
    this.orderBy = 'nameAsc';
  }

}

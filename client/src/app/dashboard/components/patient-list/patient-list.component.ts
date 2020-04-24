import { Component, OnInit, ViewChild } from '@angular/core';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Title } from '@angular/platform-browser';

export interface PatientElement {
  prenom: string;
  name: string;
  weight: number;
  age: string;
}

const ELEMENT_DATA: PatientElement[] = [
  { prenom: 'Adrien', name: 'Roques', weight: 65, age: '25' },
  { prenom: 'Thomas', name: 'Top', weight: 70, age: '19' },
  { prenom: 'Benoit', name: 'Tiro', weight: 56, age: '43' },
  { prenom: 'Jerome', name: 'Calcin', weight: 76, age: '54' },
  { prenom: 'Jo', name: 'Sytrac', weight: 81, age: '56' },
  { prenom: 'Clément', name: 'Rivat', weight: 54, age: '16' },
  { prenom: 'Romane', name: 'Tori', weight: 32, age: '85' },
  { prenom: 'Clement', name: 'Magiie', weight: 15, age: '13' },
  { prenom: 'Hugo', name: 'Flurat', weight: 18, age: '89' },
  { prenom: 'Adrien', name: 'Tolo', weight: 20, age: '35' },
];

@Component({
  selector: 'app-patient-list',
  templateUrl: './patient-list.component.html',
  styleUrls: ['./patient-list.component.css']
})
export class PatientListComponent implements OnInit {
  displayedColumns: string[] = ['prenom', 'name', 'weight', 'age'];
  dataSource = new MatTableDataSource(ELEMENT_DATA);

  @ViewChild(MatSort, { static: true }) sort: MatSort;

  constructor(

  ) { }

  ngOnInit() {
    this.dataSource.sort = this.sort;
  }
}

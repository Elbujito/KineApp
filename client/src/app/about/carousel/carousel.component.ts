import { Component } from '@angular/core';
import { Image } from '../../shared/interfaces/index';

@Component({
  selector: 'app-carousel',
  templateUrl: './carousel.component.html',
  styleUrls: ['./carousel.component.css'],
})

export class CarouselComponent {
  public images = IMAGES;
  constructor() {
  }
}

const IMAGES: Image[] = [
  { 'title': 'Work easy, work faster', 'url': '../../assets/img/ordi.jpg' },
  { 'title': 'Real time IA edidemic prediction', 'url': '../../assets/img/ordi2.jpg' },
  { 'title': 'Keep your notes around the world', 'url': '../../assets/img/dsh.jpg' },
  { 'title': 'Secure stored HDS Datas ', 'url': '../../assets/img/hds.jpg' },
  { 'title': '100% made in France by the French Tech ', 'url': '../../assets/img/FrenchTechToulouse.jpg' }
];

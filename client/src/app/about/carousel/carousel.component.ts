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
  { 'title': 'Real time IA edidemic prediction', 'url': '../../assets/img/carousel_2.jpg' },
  { 'title': 'Work easy, work faster', 'url': '../../assets/img/carousel_1.jpg' },
  { 'title': 'Keep your notes around the world', 'url': '../../assets/img/carousel_3.jpg' },
  { 'title': 'Secure stored HDS Datas ', 'url': '../../assets/img/carousel_4.jpg' },
  { 'title': '100% made in France by the French Tech ', 'url': '../../assets/img/carousel_5.jpg' }
];

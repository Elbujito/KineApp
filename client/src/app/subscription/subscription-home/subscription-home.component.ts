import { Component, OnInit } from '@angular/core';

export interface Benefit {
  name: string;
  details: string;
  icon: string;
}


@Component({
  selector: 'app-subscription',
  templateUrl: './subscription-home.component.html',
  styleUrls: ['./subscription-home.component.css']
})

export class SubscriptionHomeComponent implements OnInit {

  probenefits: Benefit[] = [
    {
      name: 'Création de patient en illimité',
      details: '',
      icon: 'check',
    },
    {
      name: 'Création de pathologie en ilimité',
      details: '',
      icon: 'check',
    },
    {
       name: 'Stockage des données sur des serveurs HDS',
       details: '',
       icon: 'cloud_circle',
     },
     {
      name: 'Support de nos équipes',
      details: '',
      icon: 'contact_support',
    }
  ];

   researchbenefits: Benefit[] = [
    {
      name: 'Données des patients anonymisées en illimité',
      details: '',
      icon: 'cloud_circle',
    },
    {
      name: 'Visualisation 3D des données',
      details: '',
      icon: 'check',
    },
    {
       name: 'Algorithmes de prédiction mise à disposition',
       details: '',
       icon: 'check',
     },
     {
      name: 'Support de nos experts en IA',
      details: '',
      icon: 'contact_support',
    }
    ];

   institutionbenefits: Benefit[] = [
    {
      name: 'Données des patients anonymisées en illimité',
      details: '',
      icon: 'cloud_circle',
    },
    {
      name: 'Visualisation 3D des données',
      details: '',
      icon: 'assessment',
    },
    {
       name: 'Rapports de nos algorithmes de prédiction',
       details: '',
       icon: 'check',
     },
     {
      name: 'Support de nos experts santé',
      details: '',
      icon: 'contact_support',
    }
   ];

  constructor() { }

  ngOnInit() {
  }

}

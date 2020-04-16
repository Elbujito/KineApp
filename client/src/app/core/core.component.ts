import {Component, OnInit} from '@angular/core';
import {Router, NavigationEnd, Event as NavigationEvent} from '@angular/router';

@Component({
  selector: 'app-core',
  templateUrl: './core.component.html',
  styleUrls: ['./core.component.css', './documentation.component.css']
})
export class CoreComponent implements OnInit {
  administrationTab: boolean;
  kinesitherapieTab: boolean;
  ostheopathieTab: boolean;
  getStart: boolean = false;
  chooserSelectedAdministration: Boolean;
  chooserSelectedKinesitherapie: Boolean;
  chooserSelectedOstheopathie: Boolean;

  constructor(private router: Router) {
    router.events.forEach((event: NavigationEvent) => {
      if (event instanceof NavigationEnd) {
        if (event.urlAfterRedirects.indexOf('administration') !== -1) {
          this.getStart = true;
          this.chooserSelect('administration');
          this.scrollToHtmlElement('filters-container', 1000);
        } else if (event.urlAfterRedirects.indexOf('kinesitherapie') !== -1) {
          this.getStart = true;
          this.chooserSelect('kinesitherapie');
          this.scrollToHtmlElement('filters-container', 1000);
        } else if (event.urlAfterRedirects.indexOf('ostheopathie') !== -1) {
          this.getStart = true;
          this.chooserSelect('ostheopathie');
          this.scrollToHtmlElement('filters-container', 1000);
         }
      }
    });
  }

  ngOnInit() {
    this.administrationTab = true;
    this.kinesitherapieTab = false;
    this.ostheopathieTab = false;
  }

  chooserSelect(action: string) {
    if (action === 'administration') {
      this.chooserSelectedAdministration = true;
      this.chooserSelectedKinesitherapie = false;
      this.chooserSelectedOstheopathie = false;
    } else if (action === 'kinesitherapie') {
      this.chooserSelectedAdministration = false;
      this.chooserSelectedKinesitherapie = true;
      this.chooserSelectedOstheopathie = false;
    }
    else if (action === 'ostheopathie') {
      this.chooserSelectedAdministration = false;
      this.chooserSelectedKinesitherapie = false;
      this.chooserSelectedOstheopathie = true;
     }

    this.scrollToHtmlElement('filters-container', 100);
  }

  getStarted() {
    this.getStart = true;
    this.scrollToHtmlElement('start', 100);
  }

  scrollToHtmlElement(id, timeout) {
    setTimeout(function () {
      (<HTMLInputElement>document.getElementById(id)).scrollIntoView({
        behavior: 'smooth',
        block: 'start',
        inline: 'start'
      });
    }, timeout);
  }

}

import { Component } from '@angular/core';
import { Location } from '@angular/common';

@Component({
  selector: 'app-info-utili',
  templateUrl: './info-utili.component.html',
  styleUrls: ['./info-utili.component.scss']
})
export class InfoUtiliComponent {


  constructor(private location: Location) {}

  goBack(): void {
    this.location.back();
  }

}

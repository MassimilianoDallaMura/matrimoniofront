import { Component } from '@angular/core';
import { Location } from '@angular/common';

@Component({
  selector: 'app-festa',
  templateUrl: './festa.component.html',
  styleUrls: ['./festa.component.scss']
})
export class FestaComponent {

  constructor(private location: Location) {}

  goBack(): void {
    this.location.back();
  } 

}

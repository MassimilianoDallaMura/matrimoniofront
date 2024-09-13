import { Component } from '@angular/core';
import { Location } from '@angular/common';

@Component({
  selector: 'app-cerimonia',
  templateUrl: './cerimonia.component.html',
  styleUrls: ['./cerimonia.component.scss']
})

export class CerimoniaComponent {

  constructor(private location: Location) {}

  goBack(): void {
    this.location.back();
  }

}

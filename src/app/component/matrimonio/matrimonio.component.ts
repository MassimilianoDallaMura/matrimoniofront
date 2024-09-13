import { Component } from '@angular/core';
import { Location } from '@angular/common';

@Component({
  selector: 'app-matrimonio',
  templateUrl: './matrimonio.component.html',
  styleUrls: ['./matrimonio.component.scss']
})
export class MatrimonioComponent {

  constructor(private location: Location) {}

  goBack(): void {
    this.location.back();
  }

}

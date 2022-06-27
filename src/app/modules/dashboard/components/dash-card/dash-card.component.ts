import { Component, Input, OnInit } from '@angular/core';
import { Car } from '../../models/cars.models';

@Component({
  selector: 'app-dash-card',
  templateUrl: './dash-card.component.html',
  styleUrls: ['./dash-card.component.scss']
})
export class DashCardComponent implements OnInit {

  @Input() car: Car = {};

  constructor() { }

  ngOnInit(): void {
  }

}

import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { Car } from '../../models/cars.models';
import { DashboardService } from '../../services/dashboard.service';

@Component({
  selector: 'app-add-car-overlay',
  templateUrl: './add-car-overlay.component.html',
  styleUrls: ['./add-car-overlay.component.scss']
})
export class AddCarOverlayComponent implements OnInit {

  firstFormGroup: FormGroup;
  secondFormGroup: FormGroup;
  thirdFormGroup: FormGroup;

  constructor(
    private _formBuilder: FormBuilder,
    private _service: DashboardService,
    public dialogRef: MatDialogRef<AddCarOverlayComponent>,
  ) {
    this.firstFormGroup = this._formBuilder.group({
      brand: ['', Validators.required],
      model: ['', Validators.required],
      e_car: ['', Validators.required],
    });
    this.secondFormGroup = this._formBuilder.group({
      km: ['', Validators.required],
      year: ['', Validators.required],
      shift: ['', Validators.required],
    });
    this.thirdFormGroup = this._formBuilder.group({
      fuel: ['', Validators.required],
      color: ['', Validators.required],
      car_type: ['', Validators.required],
    });
  }

  ngOnInit(): void {

  }

  /*
    Create a CAR element with the previous forms
    And push it to the cars list on cars service
    Then close the overlay
  */
  save() {
    const car: Car = {
      brand: this.firstFormGroup.value.brand,
      model: this.firstFormGroup.value.model,
      e_car: this.firstFormGroup.value.e_car,
      km: this.secondFormGroup.value.km,
      year: this.secondFormGroup.value.year,
      shift: this.secondFormGroup.value.shift,
      fuel: this.thirdFormGroup.value.fuel,
      color: this.thirdFormGroup.value.color,
      car_type: this.thirdFormGroup.value.car_type,
    }
    this._service.addCar(car);
    this.close();
  }

  close() {
    this.dialogRef.close();
  }

}

import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
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
  accumulateDamage: number = 0;

  pieceList = ['Engine', 'Wheels', 'Bumper', 'Doors', 'Headlights']

  constructor(
    private _formBuilder: FormBuilder,
    private _service: DashboardService,
    public dialogRef: MatDialogRef<AddCarOverlayComponent>,
  ) {
    this.firstFormGroup = this._formBuilder.group({
      brand: ['', Validators.required],
      model: ['', Validators.required],
      e_car: ['', Validators.required],
      km: ['', Validators.required],
      year: ['', Validators.required],
      shift: ['', Validators.required],
      fuel: ['', Validators.required],
      color: ['', Validators.required],
      car_type: ['', Validators.required],
      damageForm: this._formBuilder.array([]),
      price: [2000]
    });
  }

  ngOnInit(): void {
    this.addItemDamageForm();
  }

  get damageForm() {
    return this.firstFormGroup.get('damageForm') as FormArray;
  }

  createItemDamageForm(): FormGroup {
    return this._formBuilder.group({
      problemPiece: new FormControl(null),
      cost: new FormControl(null)
    });
  }

  addItemDamageForm() {
    this.damageForm.push(this.createItemDamageForm());
  }

  deleteItemDamageForm(index: number) {
    this.damageForm.removeAt(index);
    this.calculateDamage();
  }

  calculateDamage() {
    /*
      for each problemPiece, add the cost to accumulateDamage
    */
    this.accumulateDamage = 0;
    this.firstFormGroup.value.damageForm.forEach((damage: any) => {
      this.accumulateDamage += damage.cost;
    });
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
      km: this.firstFormGroup.value.km,
      year: this.firstFormGroup.value.year,
      shift: this.firstFormGroup.value.shift,
      fuel: this.firstFormGroup.value.fuel,
      color: this.firstFormGroup.value.color,
      car_type: this.firstFormGroup.value.car_type,
      damage: this.damageForm.value,
      price: this.firstFormGroup.value.price
    }
    this._service.addCar(car);
    this.close();
  }

  close() {
    this.dialogRef.close();
  }

}

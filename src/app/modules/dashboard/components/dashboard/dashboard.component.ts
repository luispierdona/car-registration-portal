import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatSelectChange } from '@angular/material/select';
import { MatSnackBar, MatSnackBarConfig } from '@angular/material/snack-bar';
import { Car } from '../../models/cars.models';
import { DashboardService } from '../../services/dashboard.service';


@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

  gridColumns = 4;
  cars: Car[] = [];
  filteredValues: Car[] = [];
  carKeys: string[] = [];
  searchForm: FormGroup;

  constructor(
    private dashboardService: DashboardService,
    private _snackBar: MatSnackBar,
    private _formBuilder: FormBuilder
  ) {
    this.searchForm = this._formBuilder.group({
      carKeys: new FormControl(null, [Validators.required]),
      searchInput: new FormControl({value: null, disabled: true}),
    });
  }

  ngOnInit(): void {
    // Just to show the Loading
    // setTimeout(() => { this.getCars(); }, 1500);
    this.getCars();
  }

  getCars() {
    this.dashboardService.loadCars().subscribe({
      next: (cars: Car[]) => {
        this.cars = cars;
        this.filteredValues = cars;
        cars.length > 0 ? this.getKeys() : null;
      },
      error: (err) => {
        this.openSnackBar(err?.message, 'Close',
          { duration: 2000, panelClass: ['mat-toolbar', 'mat-warn'] });
      },
      complete: () => this.openSnackBar('Cars loaded successfully', 'Close',
        { duration: 2000, panelClass: ['mat-toolbar', 'mat-primary'] })
    });
  }

  openSnackBar(message: string, action: string, config: MatSnackBarConfig) {
    this._snackBar.open(message, action, config);
  }

  // If none option selected, then searchInput field should be disabled
  optionSelected(event: MatSelectChange) {
    event?.value ? this.searchForm?.get('searchInput')?.enable() : this.resetFilters();
  }

  resetFilters() {
    this.searchForm.reset();
    this.searchForm?.get('searchInput')?.disable();
    this.filteredValues = this.cars;
  }

  // retrieve all the keys from the Car Interface
  getKeys() {
    this.carKeys = Object.keys(this.cars[0]);
  }

  filterCars() {
    const key: string = this.searchForm?.get('carKeys')?.value || null;
    const searchInput: string = this.searchForm?.get('searchInput')?.value || null;

    if (!key && !searchInput) return;

    this.filteredValues = this.cars.filter(car => {
      return searchInput ? car[key]?.toString().toLowerCase().includes(searchInput?.toLowerCase())
      : this.cars;
    })
  }


}

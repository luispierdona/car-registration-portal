import { Component, OnInit } from '@angular/core';
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
  constructor(private dashboardService: DashboardService, private _snackBar: MatSnackBar) { }

  ngOnInit(): void {
    // Just to show the Loading
    setTimeout(() => { this.getCars(); }, 1500);
  }

  getCars() {
    this.dashboardService.loadCars().subscribe({
      next: (cars: Car[]) => {
        this.cars = cars;
      },
      error: (err) => {
        this.openSnackBar(err?.message, 'Close',
        { duration: 2000, panelClass: ['mat-toolbar', 'mat-warn'] });
      },
      complete: () =>  this.openSnackBar('Cars loaded successfully', 'Close',
        { duration: 2000, panelClass: ['mat-toolbar', 'mat-primary'] })
    });
  }

  openSnackBar(message: string, action: string, config: MatSnackBarConfig) {
    this._snackBar.open(message, action, config);
  }

}

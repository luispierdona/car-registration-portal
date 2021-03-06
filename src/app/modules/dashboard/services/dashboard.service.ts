import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, throwError } from 'rxjs';
import { Car } from '../models/cars.models';

@Injectable({
  providedIn: 'root'
})
export class DashboardService {

  carsToAdd: Car[] = [];

  constructor(private http: HttpClient) { }

  // Load cars from assets/cars-list.json with a Get request and catch any errors
  loadCars() {
    return this.http.get<Car[]>('assets/cars-list.json')
    .pipe(
      catchError(this.handleError)
    );
  }

  addCar(car: Car) {
    this.carsToAdd.unshift(car);
  }

  getCarsToAdd(): Car[] {
    return this.carsToAdd;
  }

  private handleError(error: HttpErrorResponse) {
    if (error.status === 0) {
      // A client-side or network error occurred. Handle it accordingly.
      console.error('An error occurred:', error.error);
    } else {
      // The backend returned an unsuccessful response code.
      // The response body may contain clues as to what went wrong.
      console.error(
        `Backend returned code ${error.status}, body was: `, error.error);
    }
    // Return an observable with a user-facing error message.
    return throwError(() => new Error('Something bad happened, please try again later.'));
  }

}

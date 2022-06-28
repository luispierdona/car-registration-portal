import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { catchError, throwError } from 'rxjs';
import { User } from '../models/user.models';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  userConnected: User = {}

  constructor(private http: HttpClient, private router: Router) { }

  login(user: User) {
    this.userConnected = user;
    console.log(this.userConnected);
    // Redirect to Dashboard Page
    this.router.navigate(['/dashboard']);
  }

  logout() {
    this.userConnected = {}
    this.router.navigate(['/login']);
  }

  // Load users from assets/users-list.json with a Get request and catch any errors
  loadUsers() {
    return this.http.get<User[]>('assets/users-list.json')
    .pipe(
      catchError(this.handleError)
    );
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

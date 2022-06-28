import { Component, OnInit } from '@angular/core';
import { MatSnackBar, MatSnackBarConfig } from '@angular/material/snack-bar';
import { User } from '../../models/user.models';
import { LoginService } from '../../services/login.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  users: User[] = [];
  userSelected: User = {};

  constructor(
    private loginService: LoginService,
    private _snackBar: MatSnackBar,
    ) { }

  ngOnInit(): void {
    this.getUsers();
  }

  getUsers() {
    this.loginService.loadUsers().subscribe({
      next: (users: User[]) => {
        this.users = users;
      },
      error: (err) => {
        this.openSnackBar(err?.message, 'Close',
          { duration: 2000, panelClass: ['mat-toolbar', 'mat-warn'] });
      }
    });
  }

  login() {
    this.loginService.login(this.userSelected);
  }

  openSnackBar(message: string, action: string, config: MatSnackBarConfig) {
    this._snackBar.open(message, action, config);
  }

}

import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { LoginService } from 'src/app/modules/login/services/login.service';
import { ProfileOverlayComponent } from '../profile-overlay/profile-overlay.component';

@Component({
  selector: 'app-toolbar',
  templateUrl: './toolbar.component.html',
  styleUrls: ['./toolbar.component.scss']
})
export class ToolbarComponent implements OnInit {

  constructor(
    private _loginService: LoginService,
    private dialog: MatDialog
  ) { }

  ngOnInit(): void {
  }

  logout() {
    this._loginService.logout();
  }

  openProfile() {
    this.dialog.open(ProfileOverlayComponent, {
      width: '600px',
      height: '600px'
    });
  }

}

import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/modules/login/models/user.models';
import { LoginService } from 'src/app/modules/login/services/login.service';

@Component({
  selector: 'app-profile-overlay',
  templateUrl: './profile-overlay.component.html',
  styleUrls: ['./profile-overlay.component.scss']
})
export class ProfileOverlayComponent implements OnInit {

  profile: User = {}

  constructor(private _loginSevice: LoginService) { }

  ngOnInit(): void {
    this.getProfileFromService();
  }

  getProfileFromService() {
    this.profile = this._loginSevice.getProfile();
    console.log(this._loginSevice.getProfile());
  }

}

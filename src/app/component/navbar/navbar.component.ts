import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { RegisterModalComponent } from '../register-modal/register-modal.component';
import { LoginModalComponent } from '../login-modal/login-modal.component';
import { UserRegisterModalComponent } from '../user-register-modal/user-register-modal.component';
import {AuthService} from "../../services/auth.service";

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css'
})
export class NavbarComponent {

  constructor(public dialog: MatDialog, public authService: AuthService) {}
  openKitchenRegisterDialog(): void {
    const dialogRef = this.dialog.open(RegisterModalComponent, {
      width: '500px',
      height: '600px'
    })
  }
  openLoginDialog(): void {
    const dialogRef = this.dialog.open(LoginModalComponent, {
      width: '500px',
      height: '600px'
    })
  }
  openUserRegisterDialog(): void {
    const dialogRef = this.dialog.open(UserRegisterModalComponent, {
      width: '500px',
      height: '600px'
    })
  }
}

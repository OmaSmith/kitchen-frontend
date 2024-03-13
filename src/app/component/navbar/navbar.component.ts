import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { RegisterModalComponent } from '../register-modal/register-modal.component';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css'
})
export class NavbarComponent {
  
  constructor(public kitchenDialog: MatDialog, public loginDialog: MatDialog) {}
  openKitchenRegisterDialog(): void {
    const dialogRef = this.kitchenDialog.open(RegisterModalComponent, {
      width: '500px',
      height: '600px'
    })
  }
  openLoginDialog(): void {
    const dialogRef = this.loginDialog.open(RegisterModalComponent, {
      width: '500px',
      height: '600px'
    })
  }
}

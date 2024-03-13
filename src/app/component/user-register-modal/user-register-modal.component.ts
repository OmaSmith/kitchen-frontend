import { Component } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';
import { User } from '../../models/user.model';

@Component({
  selector: 'app-user-register-modal',
  templateUrl: './user-register-modal.component.html',
  styleUrl: './user-register-modal.component.css'
})
export class UserRegisterModalComponent {
  
  userForm: FormGroup
  
  constructor(private formBuilder: FormBuilder, public auth: AuthService, private router: Router) {}

  ngOnInit() {
    this.userForm = this.formBuilder.group({
      first_name: [''],
      last_name: [''],
      email: [''],
      password: [''],
      confirm_password: ['']
    })
  }
  onSubmit(): void {
    const register_user: User = {
      firstName: this.userForm.get('first_name').value,
      lastName: this.userForm.get('last_name').value,
      email: this.userForm.get('email').value,
      password: this.userForm.get('email').value,
      security_qst: [''] //replace this eventually
    }
    this.auth.postRegisterUser(register_user).subscribe({
      next: data => {
        console.log(data);
        // reroute to login page if successful?
      },
      error: err => {
        console.log(err); 
      }
    })
  }
}

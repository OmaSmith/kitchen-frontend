import { Component } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login-modal',
  templateUrl: './login-modal.component.html',
  styleUrl: './login-modal.component.css'
})
export class LoginModalComponent {
  
  loginForm: FormGroup
  
  constructor(private formBuilder: FormBuilder, public auth: AuthService, private router: Router) {}

  ngOnInit() {
    this.loginForm = this.formBuilder.group({
      email: [''],
      password: ['']
    })
  }
  onSubmit(): void {
    this.auth.postLoginUser({email: this.loginForm.get('email').value, password: this.loginForm.get('password').value}).subscribe({
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

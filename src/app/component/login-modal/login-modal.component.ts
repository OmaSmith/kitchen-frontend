import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup} from '@angular/forms';
import {AuthService} from '../../services/auth.service';
import {Router} from '@angular/router';
import {AuthResponse} from "../../models/auth.model";
import {JwtService} from "../../services/jwt.service";

@Component({
  selector: 'app-login-modal',
  templateUrl: './login-modal.component.html',
  styleUrl: './login-modal.component.css'
})
export class LoginModalComponent implements OnInit {

  loginForm: FormGroup

  constructor(private formBuilder: FormBuilder, public auth: AuthService, private jwt: JwtService, private router: Router) {
  }


  ngOnInit(): void {
    this.loginForm = this.formBuilder.group({
      email: [''],
      password: ['']
    })
  }

  onSubmit(): void {
    this.auth.postLoginUser({
      email: this.loginForm.get('email').value,
      password: this.loginForm.get('password').value
    }).subscribe((authResponse: AuthResponse): void => {
      this.jwt.saveToken(authResponse.token);
      this.auth.setIsLoggedIn(true);
      this.auth.setUsername(authResponse.username);
      this.router.navigate(['/']);
    })
  }
}

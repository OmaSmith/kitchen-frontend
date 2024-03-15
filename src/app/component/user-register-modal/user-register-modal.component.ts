import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup} from '@angular/forms';
import {AuthService} from '../../services/auth.service';
import {Router} from '@angular/router';
import {User} from '../../models/user.model';

@Component({
  selector: 'app-user-register-modal',
  templateUrl: './user-register-modal.component.html',
  styleUrl: './user-register-modal.component.css'
})
export class UserRegisterModalComponent implements OnInit {

  userForm: FormGroup
  securityQuestions: string[] = [
    "What is the name of your first pet?",
    "In what city were you born?",
    "What is your favorite movie?",
    "What is your mother's maiden name?",
    "What is the name of your elementary school?",
    "What is the model of your first car?",
    "What is your favorite food?",
    "What is the name of your favorite teacher?",
    "What is the make of your first cellphone?",
    "What is the name of your childhood best friend?"
  ];

  constructor(private formBuilder: FormBuilder,
              public auth: AuthService,
              private router: Router) {
  }


  ngOnInit(): void {
    this.userForm = this.formBuilder.group({
      firstName: [''],
      lastName: [''],
      email: [''],
      password: [''],
      securityQuestion1: ["What is the name of your first pet?"],
      securityAnswer1: [''],
      securityQuestion2: ["In what city were you born?"],
      securityAnswer2: ['']
    })
  }

  onSubmit(): void {
    const formData = this.userForm.value;
    console.log(formData);
    this.auth.postRegisterUser(formData).subscribe({
      next: data => {
        console.log(data);
      },
      error: err => {
        console.log(err);
      }
    })
  }
}

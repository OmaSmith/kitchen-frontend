import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { User } from '../models/user.model';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  registerUrl: string = "http://localhost:8080/register"
  loginUrl: string = "http://localhost:8080/login"

  constructor( private http:HttpClient ) { }

  postRegisterUser(user: User):Observable<any> {
    return this.http.post<User>(this.registerUrl, user)
  }
  postLoginUser(userCred: { email: string; password: string }): Observable<any> {
    return this.http.post<User>(this.loginUrl, userCred)
  }
  logout(): void {
    localStorage.removeItem('loggedInUser');
  }

}

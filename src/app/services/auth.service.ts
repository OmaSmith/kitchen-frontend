import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { User } from '../models/user.model';
import {Observable, Subject} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  registerUrl: string = "http://localhost:8080/register"
  loginUrl: string = "http://localhost:8080/login"
  private isLoggedInSubject: Subject<boolean> = new Subject<boolean>();
  isLoggedIn$ = this.isLoggedInSubject.asObservable();
  username: string = 'test';

  constructor( private http:HttpClient ) {
    this.isLoggedInSubject.next(false);
  }

  postRegisterUser(user):Observable<any> {
    return this.http.post<void>(this.registerUrl, user)
  }
  postLoginUser(userCred: { email: string; password: string }): Observable<any> {
    return this.http.post<User>(this.loginUrl, userCred)
  }
  logout(): void {
    localStorage.clear();
  }

  setIsLoggedIn(isLoggedIn: boolean): void {
    this.isLoggedInSubject.next(isLoggedIn);
  }

  getUsername(): string {
    return this.username;
  }

  setUsername(username: string): void {
    this.username = username;
  }

}

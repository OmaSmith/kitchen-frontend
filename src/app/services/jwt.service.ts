import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class JwtService {

  constructor() { }

  saveToken(token: string): void {
    localStorage.setItem('token', token);
  }

  // 저장된 JWT 토큰 가져오기
  getToken(): string | null {
    return localStorage.getItem('token');
  }

  // 저장된 JWT 토큰 삭제하기
  destroyToken(): void {
    localStorage.removeItem('token');
  }
}

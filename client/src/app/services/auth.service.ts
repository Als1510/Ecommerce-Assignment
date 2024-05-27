// src/app/auth.service.ts
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { jwtDecode } from 'jwt-decode';
import { Observable } from 'rxjs';
import { EnvService } from './env.service';
const TOKEN_KEY = 'x-auth-token';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http: HttpClient, private env: EnvService) { }

  register(username: string, password: string): Observable<any> {
    return this.http.post<any>(`${this.env.API_URL}/auth/register`, { username, password });
  }

  login(username: string, password: string): Observable<any> {
    return this.http.post<any>(`${this.env.API_URL}/auth/login`, { username, password });
  }

  isAuthenticated(): boolean {
    return !!localStorage.getItem(TOKEN_KEY);
  }

  getToken(): string | null {
    return localStorage.getItem(TOKEN_KEY);
  }

  setToken(token: string): void {
    localStorage.removeItem(TOKEN_KEY);
    localStorage.setItem(TOKEN_KEY, token)
  }

  clearToken(): void {
    localStorage.removeItem(TOKEN_KEY);
  }

  getCurrentUser() {
    const token = this.getToken();
    if (token) {
      let decodedToken: any = jwtDecode(token);
      return decodedToken.role;
    }
    return null;
  }
}

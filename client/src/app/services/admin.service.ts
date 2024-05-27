// src/app/admin.service.ts
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AuthService } from './auth.service';
import { EnvService } from './env.service';

@Injectable({
  providedIn: 'root'
})
export class AdminService {

  token
  headers
  constructor(private http: HttpClient, private env: EnvService, private AuthService: AuthService) {
    this.token = this.AuthService.getToken();
    this.headers = new HttpHeaders({
      'Authorization': `${this.token}`
    });
  }

  generateDiscount(): Observable<any> {
    return this.http.get<any>(`${this.env.API_URL}/admin/generate-discount`, { headers: this.headers });
  }

  getStats(): Observable<any> {
    return this.http.get<any>(`${this.env.API_URL}/admin/stats`, { headers: this.headers });
  }
}

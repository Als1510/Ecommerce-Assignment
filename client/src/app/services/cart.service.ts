// src/app/cart.service.ts
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AuthService } from './auth.service';
import { EnvService } from './env.service';

@Injectable({
  providedIn: 'root'
})
export class CartService {

  token
  headers
  constructor(private http: HttpClient, private env: EnvService, private AuthService: AuthService) {
    this.token = this.AuthService.getToken();
    this.headers = new HttpHeaders({
      'Authorization': `${this.token}`
    });
  }

  addToCart(item: string, quantity: number): Observable<any> {
    return this.http.post<any>(this.env.API_URL + '/user/add-to-cart', { item, quantity }, { headers: this.headers });
  }

  getCartItems(): Observable<any> {
    return this.http.get<any>(`${this.env.API_URL}/user/items`, { headers: this.headers });
  }

  updateCartItem(item: string, quantity: number): Observable<any> {
    return this.http.put<any>(`${this.env.API_URL}/user/update`, { item, quantity }, { headers: this.headers });
  }

  removeCartItem(item: string): Observable<any> {
    return this.http.delete<any>(`${this.env.API_URL}/user/remove`, { headers: this.headers, body: { item } });
  }

  clearCart(): Observable<any> {

    return this.http.post<any>(`${this.env.API_URL}/user/clear`, {}, { headers: this.headers });
  }

  checkout(discountCode?: string): Observable<any> {
    return this.http.post<any>(`${this.env.API_URL}/user/checkout`, { discountCode }, { headers: this.headers });
  }

  validateDiscountCode(discountCode: string): Observable<any> {
    return this.http.post<any>(`${this.env.API_URL}/user/validate-discount`, { discountCode }, { headers: this.headers });
  }
}

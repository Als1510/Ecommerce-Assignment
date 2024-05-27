// src/app/components/checkout/checkout.component.ts
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastService } from 'src/app/services/toast.service';
import { CartService } from '../../../services/cart.service';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.css']
})
export class CheckoutComponent implements OnInit {
  discountCode: string = '';
  cartItems: any[] = [];
  totalAmount: number = 0;
  discountAmount: number = 0;
  finalAmount: number = 0;

  constructor(private cartService: CartService, private router: Router, private toastService: ToastService) { }

  ngOnInit() {
    this.loadCartItems();
  }

  loadCartItems() {
    this.cartService.getCartItems().subscribe(response => {
      this.cartItems = response.items;
      this.calculateTotal();
    });
  }

  calculateTotal() {
    this.totalAmount = this.cartItems.reduce((acc, item) => acc + (item.quantity * 10), 0);
    this.discountAmount = 0;
    this.finalAmount = this.totalAmount;
  }

  applyDiscount() {
    this.cartService.validateDiscountCode(this.discountCode).subscribe(
      response => {
        if (response.valid) {
          this.discountAmount = this.totalAmount * 0.1; // 10% discount
          this.finalAmount = this.totalAmount - this.discountAmount;
          this.toastService.showSuccess(response.message)
        } else {
          this.discountAmount = 0;
          this.finalAmount = this.totalAmount;
          this.toastService.showError(response.message)
        }
      },
      error => {
        this.toastService.showError(error.error.message)
      }
    );
  }

  checkout() {
    this.cartService.checkout(this.discountCode).subscribe(response => {
      alert(response.message);
      this.router.navigate(['/']);
    });
  }
}

// src/app/components/cart/cart.component.ts
import { Component, OnInit } from '@angular/core';
import { ToastService } from 'src/app/services/toast.service';
import { CartService } from '../../../services/cart.service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {
  item: string;
  quantity: number;
  cartItems: any[] = [];

  constructor(private cartService: CartService, private toastService: ToastService) { }

  ngOnInit() {
    this.loadCartItems();
  }

  addToCart() {
    if (this.item && this.quantity > 0) {
      this.cartService.addToCart(this.item, this.quantity).subscribe(response => {
        this.loadCartItems();
        this.resetForm();
      });
    } else {
      this.toastService.showError('Please enter valid item and quantity');
    }
  }

  resetForm() {
    this.item = '';
    this.quantity = 1;
  }

  loadCartItems() {
    this.cartService.getCartItems().subscribe(response => {
      this.cartItems = response.items;
    });
  }

  updateCartItem(item: string, quantity: number) {
    this.cartService.updateCartItem(item, quantity).subscribe(response => {
      console.log(response);
      this.loadCartItems();
    });
  }

  removeCartItem(item: string) {
    this.cartService.removeCartItem(item).subscribe(response => {
      console.log(response);
      this.loadCartItems();
    });
  }

  clearCart() {
    this.cartService.clearCart().subscribe(response => {
      console.log(response);
      this.loadCartItems();
    });
  }
}

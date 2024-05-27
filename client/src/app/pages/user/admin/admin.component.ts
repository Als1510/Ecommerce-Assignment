import { Component } from '@angular/core';
import { AdminService } from '../../../services/admin.service';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html'
})
export class AdminComponent {
  stats: any;
  newDiscountCode: string;

  constructor(private adminService: AdminService) { }

  generateDiscount() {
    this.adminService.generateDiscount().subscribe(response => {
      this.newDiscountCode = response.discountCode;
    });
  }

  getStats() {
    this.adminService.getStats().subscribe(response => {
      this.stats = response;
    });
  }
}

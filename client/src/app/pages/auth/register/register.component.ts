// src/app/register/register.component.ts
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ToastService } from 'src/app/services/toast.service';
import { AuthService } from '../../../services/auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {
  username: string;
  password: string;
  errorMessage: string;

  constructor(private authService: AuthService, private router: Router, private toast: ToastService) { }

  register() {
    this.authService.register(this.username, this.password).subscribe(
      response => {
        this.toast.showSuccess(response.message)
        this.router.navigate(['/login']);
      },
      error => {
        this.toast.showError(error.error.error)
      }
    );
  }
}

// src/app/login/login.component.ts
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { jwtDecode } from 'jwt-decode';
import { ToastService } from 'src/app/services/toast.service';
import { AuthService } from '../../../services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  username: string;
  password: string;
  errorMessage: string;

  constructor(private authService: AuthService, private router: Router, private toast: ToastService) { }

  login() {
    this.authService.login(this.username, this.password).subscribe(
      response => {
        this.toast.showSuccess(response.message)
        this.authService.setToken(response.token);
        let decodedToken: any = jwtDecode(response['token']);
        if (decodedToken?.role === 'admin') {
          this.router.navigate(['/admin']);
        } else {
          this.router.navigate(['/']);
        }
      },
      error => {
        this.toast.showError(error.error.error)
      }
    );
  }
}

import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { LucideAngularModule, Building2, Mail, Lock, Eye, EyeOff } from 'lucide-angular';
import { AuthService } from '../../service/auth.service';
import { UserService } from '../../service/user.service';
import { User } from '../../model/user.model';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule, LucideAngularModule],
  templateUrl: './login.component.html',
})

export class LoginComponent {
  email = '';
  password = '';
  showPassword = false;

  readonly Building2 = Building2;
  readonly Mail = Mail;
  readonly Lock = Lock;
  readonly Eye = Eye;
  readonly EyeOff = EyeOff;

  constructor(private authService: AuthService, private router: Router, private userService: UserService) { }

  togglePasswordVisibility() {
    this.showPassword = !this.showPassword;
  }

  onSubmit() {
    this.authService.login({ email: this.email, password: this.password }).subscribe({
      next: (response) => {
        const userRole = this.authService.getCurrentRole();
        if (userRole === 'admin') {
          this.router.navigate(['/dashboard']);
        } else{
          this.router.navigate(['/']);
        }
      },
      error: (err) => {
        console.error('Login failed', err);
        alert('Invalid email or password. Please try again.');
      }
    });
  }

  fillDemoAdmin() {
    this.email = 'admin@lkestate.lk';
    this.password = 'admin@1234';
  }
}
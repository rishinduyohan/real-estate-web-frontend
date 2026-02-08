import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { LucideAngularModule, Building2, Mail, Lock, Eye, EyeOff } from 'lucide-angular';
import { AuthService } from '../../service/auth.service';

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

  constructor(private authService: AuthService, private router: Router) { }

  togglePasswordVisibility() {
    this.showPassword = !this.showPassword;
  }

  onSubmit() {
    const role = this.email === 'admin@lkestate.lk' ? 'admin' : 'customer';

    this.authService.login(role, this.email);

    if (role === 'admin') {
      this.router.navigate(['/dashboard']);
    } else {
      this.router.navigate(['/']); 
    }
  }

  fillDemoAdmin() {
    this.email = 'admin@lkestate.lk';
    this.password = 'admin123';
  }
}
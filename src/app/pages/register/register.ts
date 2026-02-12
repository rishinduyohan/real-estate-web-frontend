import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { LucideAngularModule, User, Mail, Lock, Eye, EyeOff, Phone } from 'lucide-angular';
import { AuthService } from '../../service/auth.service';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule, LucideAngularModule],
  templateUrl: './register.html',
})
export class Register {
  name = '';
  email = '';
  phone = '';
  password = '';
  confirmPassword = '';
  showPassword = false;
  userType: 'buyer' | 'seller' = 'buyer';
  agreedToTerms = false;

  readonly User = User;
  readonly Mail = Mail;
  readonly Lock = Lock;
  readonly Eye = Eye;
  readonly EyeOff = EyeOff;
  readonly Phone = Phone;

  constructor(private authService: AuthService, private router: Router) { }

  togglePasswordVisibility() {
    this.showPassword = !this.showPassword;
  }

  setUserType(type: 'buyer' | 'seller') {
    this.userType = type;
  }

  onSubmit() {
    if (this.password !== this.confirmPassword) {
      alert('Passwords do not match!');
      return;
    }

    if (!this.agreedToTerms) {
      alert('Please agree to the Terms of Service.');
      return;
    }

    console.log('Registering user:', {
      name: this.name,
      email: this.email,
      phone: this.phone,
      role: this.userType
    });

    const role = this.userType === 'buyer' ? 'customer' : 'owner';
    this.authService.login(role, this.email);
    this.router.navigate(['/']);
  }
}

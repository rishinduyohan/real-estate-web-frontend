import { Component, Input } from '@angular/core';
import { CommonModule, getLocaleDateFormat } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { LucideAngularModule, Mail, UserCheck, Lock, Eye, EyeOff, Phone } from 'lucide-angular';
import { AuthService } from '../../service/auth.service';
import { User } from '../../model/user.model';

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
  @Input() role !: 'customer' | 'owner';

  user !: User;

  readonly User2 = UserCheck;
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

    this.role = this.userType === 'buyer' ? 'customer' : 'owner';

    this.setUserDetails();

    console.log('Registered User:', this.user);

    this.authService.login(this.user);

    this.router.navigate(['/']);
  }

  setUserDetails() {
    this.user = {
      id: Math.floor(Math.random() * 1000),
      fullName: this.name,
      email: this.email,
      image: '',
      password: this.password,
      phone: this.phone,
      role: this.role as 'customer' | 'owner',
      createdDate: new Date()
    };
  }
}

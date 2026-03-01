import { Component, Input } from '@angular/core';
import { CommonModule, getLocaleDateFormat } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { LucideAngularModule, Mail, UserCheck, Lock, Eye, EyeOff, Phone, Camera } from 'lucide-angular';
import { AuthService } from '../../service/auth.service';
import { CloudinaryService } from '../../service/CloudinaryService.service';
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
  @Input() role !: 'CUSTOMER' | 'OWNER';

  isUploading = false;

  user !: User;

  readonly User2 = UserCheck;
  readonly Mail = Mail;
  readonly Lock = Lock;
  readonly Eye = Eye;
  readonly EyeOff = EyeOff;
  readonly Phone = Phone;
  readonly Camera = Camera;

  constructor(
    private authService: AuthService,
    private cloudinaryService: CloudinaryService,
    private router: Router
  ) { }

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

    this.role = this.userType === 'buyer' ? 'CUSTOMER' : 'OWNER';
  }

  private executeRegistration() {
    console.log('Registering User:', this.user);
    this.authService.register(this.user).subscribe({
      next: (response) => {
        this.isUploading = false;
        alert('Registration successful! Please log in.');
        this.router.navigate(['/login']);
      },
      error: (err) => {
        console.error('Registration error', err);
        this.isUploading = false;
        alert('Failed to register. Please try again.');
      }
    });
  }

  setUserDetails(uploadedUrl?: string) {
    this.user = {
      username: this.name,
      email: this.email,
      password: this.password,
      role: this.role as 'CUSTOMER' | 'OWNER' | 'ADMIN',
      phone: this.phone,
      imageUrl: 'https://via.placeholder.com/150',
    };
  }
}

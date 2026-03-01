import { CommonModule } from '@angular/common';
import { Component, Input, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { InquiryService } from '../../service/inquiry.service';
import { AuthService } from '../../service/auth.service';

@Component({
  selector: 'app-inquiry',
  imports: [FormsModule, CommonModule],
  templateUrl: './inquiry.html',
  styleUrl: './inquiry.css',
})
export class Inquiry {
  @Input() propertyId!: number;
  private inquiryService = inject(InquiryService);
  private authService = inject(AuthService);

  inquiryData: any = { name: '', email: '', phone: '', message: '' };
  isSubmitting = false;

  handleInquirySubmit() {
    if (!this.propertyId) {
      alert("Error: Property ID is missing. Cannot send inquiry.");
      return;
    }

    this.isSubmitting = true;
    const userId = this.authService.getCurrentUserId();
    const payload = {
      ...this.inquiryData,
      customerId: userId
    };

    this.inquiryService.createInquiry(this.propertyId, payload).subscribe({
      next: (res) => {
        alert('Inquiry sent! The owner will contact you soon.');
        this.inquiryData = { name: '', email: '', phone: '', message: '' };
        this.isSubmitting = false;
      },
      error: (err) => {
        console.error("Failed to send inquiry", err);
        alert('An error occurred submitting your inquiry. Please try again.');
        this.isSubmitting = false;
      }
    });
  }

}

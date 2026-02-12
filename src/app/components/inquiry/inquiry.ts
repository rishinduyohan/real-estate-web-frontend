import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-inquiry',
  imports: [FormsModule,CommonModule],
  templateUrl: './inquiry.html',
  styleUrl: './inquiry.css',
})
export class Inquiry {

  inquiryData = { name: '', email: '', phone: '', message: '' };

  handleInquirySubmit() {
    alert('Inquiry sent! The agent will contact you soon.');
    this.inquiryData = { name: '', email: '', phone: '', message: '' };
  }

}

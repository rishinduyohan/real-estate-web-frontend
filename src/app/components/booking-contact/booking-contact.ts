import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-booking-contact',
  imports: [FormsModule,CommonModule],
  templateUrl: './booking-contact.html',
  styleUrl: './booking-contact.css',
})
export class BookingContact {

    bookingData = { name: '', email: '', phone: '', date: '', time: '' };

    handleBookingSubmit() {
    alert('Visit booked successfully! You will receive a confirmation.');
    this.bookingData = { name: '', email: '', phone: '', date: '', time: '' };
  }
}

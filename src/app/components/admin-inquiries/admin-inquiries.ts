import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';

@Component({
  selector: 'app-admin-inquiries',
  imports: [CommonModule],
  templateUrl: './admin-inquiries.html',
  styleUrl: './admin-inquiries.css',
})
export class AdminInquiries {

    recentInquiries = [
    { id: 1, customer: 'Rajesh Kumar', property: 'Luxury Villa in Colombo 7', status: 'New', time: '5 min ago' },
    { id: 2, customer: 'Ayesha Fernando', property: 'Modern Apartment with City View', status: 'In Progress', time: '2 hours ago' },
    { id: 3, customer: 'Sunil Perera', property: 'Beautiful Family House', status: 'Responded', time: '5 hours ago' },
    { id: 4, customer: 'Nisha Silva', property: 'Commercial Office Space', status: 'New', time: '1 day ago' },
  ];

}

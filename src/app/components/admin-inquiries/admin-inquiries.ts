import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { InquiryService } from '../../service/inquiry.service';
import { Inquiry } from '../../model/inquiry.model';
import { AuthService } from '../../service/auth.service';

@Component({
  selector: 'app-admin-inquiries',
  imports: [CommonModule],
  templateUrl: './admin-inquiries.html',
  styleUrl: './admin-inquiries.css',
})
export class AdminInquiries implements OnInit {
  recentInquiries: any[] = []; // Using any to match template for now, will refine

  constructor(
    private inquiryService: InquiryService,
    private authService: AuthService
  ) { }

  ngOnInit() {
    this.loadInquiries();
  }

  loadInquiries() {
    const userId = this.authService.getCurrentUserId();
    const role = this.authService.getCurrentRole();

    this.inquiryService.getInquiriesForUser(userId, role).subscribe(inquiries => {
      // Map inquiry model to view model if necessary, or just use as is
      this.recentInquiries = inquiries.map(inquiry => ({
        id: inquiry.id,
        customer: inquiry.name,
        property: inquiry.propertyTitle,
        status: inquiry.status,
        time: this.getTimeAgo(inquiry.date) // Helper function needed
      }));
    });
  }

  getTimeAgo(date: Date): string {
    const seconds = Math.floor((new Date().getTime() - new Date(date).getTime()) / 1000);
    let interval = seconds / 31536000;
    if (interval > 1) return Math.floor(interval) + " years ago";
    interval = seconds / 2592000;
    if (interval > 1) return Math.floor(interval) + " months ago";
    interval = seconds / 86400;
    if (interval > 1) return Math.floor(interval) + " days ago";
    interval = seconds / 3600;
    if (interval > 1) return Math.floor(interval) + " hours ago";
    interval = seconds / 60;
    if (interval > 1) return Math.floor(interval) + " minutes ago";
    return Math.floor(seconds) + " seconds ago";
  }
}

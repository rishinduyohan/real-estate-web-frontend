import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { InquiryService } from '../../service/inquiry.service';
import { Inquiry } from '../../model/inquiry.model';
import { AuthService } from '../../service/auth.service';
import { Router, RouterModule } from '@angular/router';

@Component({
  selector: 'app-admin-inquiries',
  imports: [CommonModule, RouterModule],
  templateUrl: './admin-inquiries.html',
  styleUrl: './admin-inquiries.css',
})
export class AdminInquiries implements OnInit {
  recentInquiries: any[] = [];

  constructor(
    private inquiryService: InquiryService,
    private authService: AuthService,
    private router: Router
  ) { }

  ngOnInit() {
    this.loadInquiries();
  }

  loadInquiries() {
    const userId = this.authService.getCurrentUserId();
    const role = this.authService.getCurrentRole();

    this.inquiryService.getInquiriesForUser(userId, role).subscribe(inquiries => {
      this.recentInquiries = inquiries.map(inquiry => ({
        id: inquiry.id,
        customer: inquiry.name,
        property: inquiry.propertyTitle,
        status: inquiry.status,
        date : inquiry.date
      }));
    });
  }
  routes(){
    this.router.navigate(['/inquiries']);
  }
}

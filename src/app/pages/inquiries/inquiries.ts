import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { NavbarComponent } from '../../components/navbar/navbar.component';
import { InquiryService } from '../../service/inquiry.service';
import { Inquiry } from '../../model/inquiry.model';
import { AuthService } from '../../service/auth.service';
import { LucideAngularModule, Search, MessageCircle, MoreVertical, X, Send } from 'lucide-angular';

@Component({
    selector: 'app-inquiries',
    standalone: true,
    imports: [CommonModule, FormsModule, NavbarComponent, LucideAngularModule],
    templateUrl: './inquiries.html',
})
export class InquiriesPage implements OnInit {
    inquiries: Inquiry[] = [];
    filteredInquiries: Inquiry[] = [];
    searchQuery: string = '';

    selectedInquiry: Inquiry | null = null;
    isReplyModalOpen = false;
    replyMessage = '';

    readonly Search = Search;
    readonly MessageCircle = MessageCircle;
    readonly MoreVertical = MoreVertical;
    readonly X = X;
    readonly Send = Send;

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

        this.inquiryService.getInquiriesForUser(userId, role).subscribe({
            next: (data) => {
                this.inquiries = data;
                this.applyFilter();
            },
            error: (err) => console.error('Failed to load inquiries', err)
        });
    }

    applyFilter() {
        if (!this.searchQuery) {
            this.filteredInquiries = this.inquiries;
        } else {
            const query = this.searchQuery.toLowerCase();
            this.filteredInquiries = this.inquiries.filter(inquiry =>
                inquiry.name.toLowerCase().includes(query) ||
                inquiry.email.toLowerCase().includes(query) ||
                (inquiry.propertyTitle && inquiry.propertyTitle.toLowerCase().includes(query))
            );
        }
    }

    openReplyModal(inquiry: Inquiry) {
        this.selectedInquiry = inquiry;
        // If already replied, populate the message (optional, usually you want new reply)
        this.replyMessage = inquiry.reply || '';
        this.isReplyModalOpen = true;
    }

    closeReplyModal() {
        this.isReplyModalOpen = false;
        this.selectedInquiry = null;
        this.replyMessage = '';
    }

    sendReply() {
        if (!this.selectedInquiry || !this.replyMessage.trim()) return;

        this.inquiryService.replyToInquiry(this.selectedInquiry.id, this.replyMessage).subscribe(() => {
            alert('Reply sent successfully!');
            this.closeReplyModal();
            this.loadInquiries(); // Refresh list to see updated status
        });
    }

    getStatusColor(status: string): string {
        switch (status) {
            case 'New': return 'bg-blue-100 text-blue-800';
            case 'In Progress': return 'bg-yellow-100 text-yellow-800';
            case 'Responded': return 'bg-green-100 text-green-800';
            default: return 'bg-gray-100 text-gray-800';
        }
    }
}

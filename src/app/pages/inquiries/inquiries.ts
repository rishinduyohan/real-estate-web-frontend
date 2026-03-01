import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { NavbarComponent } from '../../components/navbar/navbar.component';
import { InquiryCardComponent } from '../../components/inquiry-card/inquiry-card.component';
import { InquiryService } from '../../service/inquiry.service';
import { Inquiry } from '../../model/inquiry.model';
import { AuthService } from '../../service/auth.service';
import { UserService } from '../../service/user.service';
import { LucideAngularModule, Search, MessageCircle, MoreVertical, X, Send, Trash2 } from 'lucide-angular';

@Component({
    selector: 'app-inquiries',
    standalone: true,
    imports: [CommonModule, FormsModule, NavbarComponent, LucideAngularModule, InquiryCardComponent],
    templateUrl: './inquiries.html',
})
export class InquiriesPage implements OnInit {
    inquiries: Inquiry[] = [];
    filteredInquiries: Inquiry[] = [];
    searchQuery: string = '';

    selectedInquiry: Inquiry | null = null;
    isReplyModalOpen = false;
    replyMessage = '';
    isAdmin = false;
    currentUserId: number = 0;

    readonly Search = Search;
    readonly MessageCircle = MessageCircle;
    readonly MoreVertical = MoreVertical;
    readonly X = X;
    readonly Send = Send;
    readonly Trash2 = Trash2;

    constructor(
        private inquiryService: InquiryService,
        private authService: AuthService,
        private userService: UserService
    ) { }

    ngOnInit() {
        this.loadInquiries();
    }

    loadInquiries() {
        const userId = this.authService.getCurrentUserId();
        this.currentUserId = userId;
        const role = this.authService.getCurrentRole();

        this.userService.getUsers().subscribe(users => {
            const user = users.find(u => u.id === userId);
            this.isAdmin = user?.role === 'admin';
            const email = user ? user.email : '';

            this.inquiryService.getInquiriesForUser(userId, role).subscribe({
                next: (data) => {
                    this.inquiries = data.map(inq => {
                        const customerUser = users.find(u => u.id === inq.customerId) || users.find(u => u.email === inq.email);
                        return {
                            ...inq,
                            customerImageUrl: customerUser ? customerUser.imageUrl : undefined
                        };
                    });
                    this.applyFilter();
                },
                error: (err) => console.error('Failed to load inquiries', err)
            });
        });
    }

    deleteInquiry(inquiry: Inquiry) {
        if (!confirm('Are you sure you want to remove this inquiry?')) return;

        this.inquiryService.deleteInquiry(inquiry.id).subscribe(() => {
            this.loadInquiries();
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
            this.loadInquiries();
        });
    }

    getStatusColor(status: string): string {
        switch (status) {
            case 'NEW': return 'bg-blue-100 text-blue-800';
            case 'IN_PROGRESS': return 'bg-yellow-100 text-yellow-800';
            case 'RESPONDED': return 'bg-green-100 text-green-800';
            default: return 'bg-gray-100 text-gray-800';
        }
    }
}

import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { NavbarComponent } from '../../components/navbar/navbar.component';
import { InquiryService } from '../../service/inquiry.service';
import { Inquiry } from '../../model/inquiry.model';
import { AuthService } from '../../service/auth.service';
import { AgentService } from '../../service/agent.service';
import { UserService } from '../../service/user.service';
import { LucideAngularModule, Search, MessageCircle, MoreVertical, X, Send, Trash2 } from 'lucide-angular';
import { forkJoin } from 'rxjs';

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
    readonly Trash2 = Trash2;

    constructor(
        private inquiryService: InquiryService,
        private authService: AuthService,
        private agentService: AgentService,
        private userService: UserService
    ) { }

    ngOnInit() {
        this.loadInquiries();
    }

    loadInquiries() {
        const userId = this.authService.getCurrentUserId();
        const role = this.authService.getCurrentRole();

        let email = '';
        if (role === 'customer') {
            const user = this.userService.getUsers().find(u => u.id === userId);
            email = user ? user.email : '';
        }

        const inquiries$ = this.inquiryService.getInquiriesForUser(userId, role, email);

        if (role === 'customer') {
            const requests$ = this.agentService.getRequestsByUser(userId);

            forkJoin([inquiries$, requests$]).subscribe({
                next: ([inquiries, requests]) => {
                    const requestInquiries: any[] = requests.map(req => ({
                        id: req.id + 10000, // Offset ID to avoid collision
                        name: req.userName,
                        email: req.userEmail,
                        phone: 'N/A',
                        message: `Agent Application for Owner ID: ${req.ownerId}`,
                        propertyTitle: 'Agent Application',
                        status: req.status === 'pending' ? 'In Progress' : 'Responded',
                        date: req.date,
                        reply: req.status === 'approved' ? 'Congratulations! Your application has been approved.' : (req.status === 'rejected' ? 'Your application was not successful.' : '')
                    }));

                    this.inquiries = [...inquiries, ...requestInquiries].sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
                    this.applyFilter();
                },
                error: (err) => console.error('Failed to load data', err)
            });
        } else {
            inquiries$.subscribe({
                next: (data) => {
                    this.inquiries = data;
                    this.applyFilter();
                },
                error: (err) => console.error('Failed to load inquiries', err)
            });
        }
    }

    deleteInquiry(inquiry: Inquiry) {
        if (!confirm('Are you sure you want to remove this inquiry?')) return;

        if (inquiry.id >= 10000) {
            // It's an agent request
            const requestId = inquiry.id - 10000;
            this.agentService.cancelRequest(requestId).subscribe(() => {
                this.loadInquiries();
            });
        } else {
            // Standard inquiry
            this.inquiryService.deleteInquiry(inquiry.id).subscribe(() => {
                this.loadInquiries();
            });
        }
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
            case 'New': return 'bg-blue-100 text-blue-800';
            case 'In Progress': return 'bg-yellow-100 text-yellow-800';
            case 'Responded': return 'bg-green-100 text-green-800';
            default: return 'bg-gray-100 text-gray-800';
        }
    }
}

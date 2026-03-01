import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Inquiry } from '../../model/inquiry.model';
import { LucideAngularModule, MessageCircle, Trash2, ChevronDown, ChevronUp, Mail, Phone } from 'lucide-angular';

@Component({
    selector: 'app-inquiry-card',
    standalone: true,
    imports: [CommonModule, LucideAngularModule],
    templateUrl: './inquiry-card.component.html'
})
export class InquiryCardComponent {
    @Input() inquiry!: Inquiry;
    @Input() currentUserId!: number;
    @Input() isAdmin: boolean = false;

    @Output() reply = new EventEmitter<Inquiry>();
    @Output() delete = new EventEmitter<Inquiry>();

    isExpanded = false;

    readonly MessageCircle = MessageCircle;
    readonly Trash2 = Trash2;
    readonly ChevronDown = ChevronDown;
    readonly ChevronUp = ChevronUp;
    readonly Mail = Mail;
    readonly Phone = Phone;

    toggleExpand() {
        this.isExpanded = !this.isExpanded;
    }

    openReplyModal() {
        this.reply.emit(this.inquiry);
    }

    deleteInquiry() {
        this.delete.emit(this.inquiry);
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

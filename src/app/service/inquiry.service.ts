import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { map } from 'rxjs/operators';
import { Inquiry } from '../model/inquiry.model';
import { PropertyService } from './property-service.service';

@Injectable({
    providedIn: 'root'
})
export class InquiryService {
    constructor(private propertyService: PropertyService) { }

    private inquiries: Inquiry[] = [
        {
            id: 1,
            name: 'Rajesh Kumar',
            email: 'rajesh@example.com',
            phone: '0771234567',
            message: 'I am interested in visiting this property on the weekend.',
            propertyId: 1,
            propertyTitle: 'Luxury Villa in Colombo 7',
            status: 'New',
            date: new Date(Date.now() - 1000 * 60 * 5) // 5 mins ago
        },
        {
            id: 2,
            name: 'Ayesha Fernando',
            email: 'ayesha@example.com',
            phone: '0719876543',
            message: 'Is the price negotiable? I am a serious buyer.',
            propertyId: 2,
            propertyTitle: 'Modern Apartment with City View',
            status: 'In Progress',
            date: new Date(Date.now() - 1000 * 60 * 60 * 2) // 2 hours ago
        },
        {
            id: 3,
            name: 'Sunil Perera',
            email: 'sunil@example.com',
            phone: '0765554444',
            message: 'Can you send more photos of the garden?',
            propertyId: 3,
            propertyTitle: 'Beautiful Family House',
            status: 'Responded',
            date: new Date(Date.now() - 1000 * 60 * 60 * 5), // 5 hours ago
            reply: 'Sent the photos to your email.'
        },
        {
            id: 4,
            name: 'Nisha Silva',
            email: 'nisha@example.com',
            phone: '0701112222',
            message: 'What is the lease period for this office space?',
            propertyId: 4,
            propertyTitle: 'Commercial Office Space',
            status: 'New',
            date: new Date(Date.now() - 1000 * 60 * 60 * 24) // 1 day ago
        }
    ];

    getInquiriesForUser(userId: number, role: string, email?: string): Observable<Inquiry[]> {
        if (role === 'admin') {
            return this.getInquiries();
        } else if (role === 'customer' && email) {
            return of(this.inquiries.filter(i => i.email === email));
        } else {
            return this.propertyService.getProperties().pipe(
                map(properties => {
                    const userPropertyIds = properties
                        .filter(p => p.ownerId === userId)
                        .map(p => p.id);
                    return this.inquiries.filter(i => i.propertyId !== undefined && userPropertyIds.includes(i.propertyId));
                })
            );
        }
    }

    getInquiries(): Observable<Inquiry[]> {
        return of(this.inquiries);
    }

    getInquiryById(id: number): Observable<Inquiry | undefined> {
        return of(this.inquiries.find(i => i.id === id));
    }

    updateInquiry(inquiry: Inquiry): Observable<void> {
        const index = this.inquiries.findIndex(i => i.id === inquiry.id);
        if (index !== -1) {
            this.inquiries[index] = inquiry;
        }
        return of(void 0);
    }

    replyToInquiry(id: number, replyMessage: string): Observable<void> {
        const inquiry = this.inquiries.find(i => i.id === id);
        if (inquiry) {
            inquiry.status = 'Responded';
            inquiry.reply = replyMessage;
        }
        return of(void 0);
    }

    deleteInquiry(id: number): Observable<void> {
        this.inquiries = this.inquiries.filter(i => i.id !== id);
        return of(void 0);
    }
}

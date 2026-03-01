import { Injectable, inject } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Inquiry } from '../model/inquiry.model';
import { AuthService } from './auth.service';

@Injectable({
    providedIn: 'root'
})
export class InquiryService {
    private http = inject(HttpClient);
    private authService = inject(AuthService);
    private apiUrl = 'http://localhost:8080/api/inquiries';

    constructor() { }
    getInquiriesForUser(userId: number, role: string): Observable<Inquiry[]> {
        return this.http.get<Inquiry[]>(`${this.apiUrl}/user/${userId}?role=${role}`);
    }

    createInquiry(propertyId: number, inquiryData: any): Observable<Inquiry> {
        const token = localStorage.getItem('token');
        const headers = new HttpHeaders({
            'Authorization': `Bearer ${token}`
        });
        return this.http.post<Inquiry>(`http://localhost:8080/api/inquiries/add/${propertyId}`, inquiryData, { headers });
    }

    replyToInquiry(id: number, replyMessage: string): Observable<Inquiry> {
        return this.http.post<Inquiry>(`${this.apiUrl}/reply/${id}`, { reply: replyMessage });
    }

    deleteInquiry(id: number): Observable<void> {
        return this.http.delete<void>(`${this.apiUrl}/${id}`);
    }
}

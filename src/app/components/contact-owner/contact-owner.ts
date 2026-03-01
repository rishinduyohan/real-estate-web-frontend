import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { LucideAngularModule, Phone, Mail, Calendar, X } from 'lucide-angular';
import { Inquiry } from '../inquiry/inquiry';
import { BookingContact } from "../booking-contact/booking-contact";
import { ActivatedRoute, Router } from '@angular/router';
import { PropertyService } from '../../service/property-service.service';
import { UserService } from '../../service/user.service';
import { User } from '../../model/user.model';

@Component({
    selector: 'app-contact-owner',
    imports: [LucideAngularModule, CommonModule, Inquiry, BookingContact],
    templateUrl: './contact-owner.html'
})
export class ContactOwner implements OnInit {
    showInquiryForm = false;
    showBookingForm = false;
    readonly Phone = Phone;
    readonly Mail = Mail;
    readonly Calender = Calendar;
    readonly X = X;

    user!: User;
    propertyId!: number;


    constructor(
        private route: ActivatedRoute,
        private router: Router,
        private propertyService: PropertyService,
        private userService: UserService
    ) { }

    ngOnInit() {
        this.route.paramMap.subscribe(params => {
            const id = params.get('id');
            if (id) {
                this.propertyService.getPropertyById(+id).subscribe(prop => {
                    if (prop) {
                        this.propertyId = prop.id || 0;
                        this.searchOwner(prop.ownerId);
                    }
                })
            }
        });
    }

    searchOwner(ownerId: number) {
        this.userService.searchUser(ownerId).subscribe(user => {
            if (user) {
                this.user = user;
            }
        });
    }

    openInquiry() {
        this.showInquiryForm = true;
        this.showBookingForm = false;
    }

    openBooking() {
        this.showBookingForm = true;
        this.showInquiryForm = false;
    }
    closeModals() {
        this.showInquiryForm = false;
        this.showBookingForm = false;
    }
}

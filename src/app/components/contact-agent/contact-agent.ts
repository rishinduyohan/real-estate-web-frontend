import { CommonModule } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';
import { LucideAngularModule, Phone, Mail, Calendar, X } from 'lucide-angular';
import { Inquiry } from '../inquiry/inquiry';
import { BookingContact } from "../booking-contact/booking-contact";
import { ActivatedRoute, Router } from '@angular/router';
import { Property } from '../../model/property.model';
import { PropertyService } from '../../service/property-service.service';
import { AgentService } from '../../service/agent.service';
import { Owner } from '../../model/owner.model';
import { Agent } from '../../model/agent.model';

@Component({
  selector: 'app-contact-agent',
  imports: [LucideAngularModule, CommonModule, Inquiry, BookingContact],
  templateUrl: './contact-agent.html',
  styleUrl: './contact-agent.css',
})
export class ContactAgent implements OnInit {
  showInquiryForm = false;
  showBookingForm = false;
  readonly Phone = Phone;
  readonly Mail = Mail;
  readonly Calender = Calendar;
  readonly X = X;

  agent!: Agent;


  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private propertyService: PropertyService,
    private agentService: AgentService
  ) { }

  ngOnInit() {
    this.route.paramMap.subscribe(params => {
      const id = params.get('id');
      if (id) {
        this.propertyService.getPropertyById(+id).subscribe(prop => {
          this.searchAgents(prop.ownerId);
        })
      }
    });
  }

  searchAgents(ownerId: number) {
    this.agentService.getAgentsByOwnerId(ownerId).subscribe(agents => {
      if (agents && agents.length > 0) {
        this.agent = agents[0]; 
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

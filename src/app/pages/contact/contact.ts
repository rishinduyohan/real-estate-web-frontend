import { Component } from '@angular/core';
import { FooterComponent } from "../../components/footer/footer.component";
import { NavbarComponent } from '../../components/navbar/navbar.component';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { LucideAngularModule, Phone, Mail, MessageCircle} from 'lucide-angular';
@Component({
  selector: 'app-contact',
  imports: [FooterComponent ,NavbarComponent,CommonModule, LucideAngularModule, FormsModule],
  templateUrl: './contact.html',
})
export class Contact {
  readonly Phone = Phone;
  readonly Mail = Mail;
  readonly MessageCircle = MessageCircle;

  contactInfo = {
    phone: '011 2 350 350',
    email: 'support@lkestate.lk',
    hours: {
      weekdays: '9am - 6pm on weekdays',
      weekends: '8am - 5pm on weekends and mercantile holidays'
    }
  };
}

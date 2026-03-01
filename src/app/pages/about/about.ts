import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { NavbarComponent } from '../../components/navbar/navbar.component';
import { FooterComponent } from '../../components/footer/footer.component';
import { LucideAngularModule, Search, Tag, Phone, Target, Building2, Mail, Plus } from 'lucide-angular';

@Component({
  selector: 'app-about',
  imports: [CommonModule,NavbarComponent , FooterComponent, LucideAngularModule],
  templateUrl: './about.html',
  styleUrl: './about.css',
})
export class About {
   readonly Search = Search;
  readonly Tag = Tag;
  readonly Phone = Phone;
  readonly Mail = Mail;
  readonly Plus = Plus;
  readonly Building2 = Building2;
}

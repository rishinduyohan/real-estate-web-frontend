import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { LucideAngularModule, Building2, MessageSquare, TrendingUp, Users, Eye, Heart, Phone } from 'lucide-angular';
import { AuthService } from '../../service/auth.service';
import { PropertyService } from '../../service/property-service.service';
import { Property } from '../../model/property.model';
import { NavbarComponent } from '../../components/navbar/navbar.component';
import { AdminInquiries } from '../../components/admin-inquiries/admin-inquiries';
import { PropertyTable } from '../../components/property-table/property-table';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule, RouterModule, PropertyTable, LucideAngularModule,NavbarComponent,AdminInquiries],
  templateUrl: './dashboard.html',
  styleUrl: './dashboard.css'
})
export class DashboardComponent implements OnInit {
  userRole$: any;
  topProperties: Property[] = [];

  readonly Building2 = Building2;
  readonly MessageSquare = MessageSquare;
  readonly TrendingUp = TrendingUp;
  readonly Users = Users;
  readonly Eye = Eye;
  readonly Heart = Heart;
  readonly Phone = Phone;

  stats = [
    {
      icon: Building2,
      label: 'Total Properties',
      value: '127',
      change: '+12%',
      color: 'text-blue-600',
      bgColor: 'bg-blue-50'
    },
    {
      icon: MessageSquare,
      label: 'Inquiries',
      value: '48',
      change: '+23%',
      color: 'text-primary',
      bgColor: 'bg-orange-50'
    },
    {
      icon: TrendingUp,
      label: 'Properties Sold',
      value: '32',
      change: '+8%',
      color: 'text-green-600',
      bgColor: 'bg-green-50'
    },
    {
      icon: Users,
      label: 'Active Users',
      value: '1,245',
      change: '+15%',
      color: 'text-purple-600',
      bgColor: 'bg-purple-50'
    }
  ];


  constructor(
    private authService: AuthService,
    private propertyService: PropertyService
  ) { }

  ngOnInit() {
    this.userRole$ = this.authService.userRole$;
    this.propertyService.getProperties().subscribe(props => {
      this.topProperties = props.slice(0, 5);
    });
  }

  getIconForStat(stat: any) {
    return stat.icon;
  }
}

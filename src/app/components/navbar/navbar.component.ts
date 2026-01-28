import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LucideAngularModule, Building2, Menu, X, User, Heart, Plus } from 'lucide-angular';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [CommonModule, LucideAngularModule],
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent {
  @Input() isAuthenticated: boolean = false;
  @Input() userRole: 'customer' | 'owner' | 'agent' | 'admin' | undefined;
  @Input() currentScreen: string = 'home';

  @Output() navigate = new EventEmitter<string>();
  @Output() login = new EventEmitter<void>();
  @Output() logout = new EventEmitter<void>();

  mobileMenuOpen = false;
  userMenuOpen = false;

  readonly icons = {
    Building2,
    Menu,
    X,
    User,
    Heart,
    Plus
  };

  publicNavItems = [
    { id: 'home', label: 'Home' },
    { id: 'properties', label: 'Properties' },
    { id: 'agents', label: 'Our Agents' },
    { id: 'about', label: 'About Us' },
    { id: 'contact', label: 'Contact' },
  ];

  customerNavItems = [
    { id: 'home', label: 'Home' },
    { id: 'search', label: 'Browse Properties' },
    { id: 'saved', label: 'Saved Properties' },
    { id: 'my-inquiries', label: 'My Inquiries' },
  ];

  adminNavItems = [
    { id: 'dashboard', label: 'Dashboard' },
    { id: 'manage-properties', label: 'Manage Properties' },
    { id: 'inquiries', label: 'Inquiries' },
    { id: 'users', label: 'Users' },
  ];

  agentNavItems = [
    { id: 'dashboard', label: 'Dashboard' },
    { id: 'my-properties', label: 'My Properties' },
    { id: 'inquiries', label: 'Inquiries' },
    { id: 'profile', label: 'My Profile' },
  ];

  ownerNavItems = [
    { id: 'home', label: 'Home' },
    { id: 'my-listings', label: 'My Listings' },
    { id: 'add-property', label: 'Add Property' },
    { id: 'inquiries', label: 'Inquiries' },
  ];

  get navItems() {
    if (!this.isAuthenticated) return this.publicNavItems;
    switch (this.userRole) {
      case 'admin': return this.adminNavItems;
      case 'agent': return this.agentNavItems;
      case 'owner': return this.ownerNavItems;
      case 'customer': return this.customerNavItems;
      default: return this.publicNavItems;
    }
  }

  onNavigate(screen: string) {
    this.navigate.emit(screen);
    this.mobileMenuOpen = false;
    this.userMenuOpen = false;
  }

  toggleMobileMenu() {
    this.mobileMenuOpen = !this.mobileMenuOpen;
  }

  toggleUserMenu() {
    this.userMenuOpen = !this.userMenuOpen;
  }

  onLogoutClick() {
    this.logout.emit();
    this.userMenuOpen = false;
    this.mobileMenuOpen = false;
  }
}

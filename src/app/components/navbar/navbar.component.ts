import { Component, OnInit, OnDestroy, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterModule } from '@angular/router';
import { LucideAngularModule, Building2, Menu, X, User, Heart, Plus } from 'lucide-angular';
import { AuthService, UserRole } from '../../service/auth.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [CommonModule, RouterModule, LucideAngularModule],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css'
})
export class NavbarComponent implements OnInit, OnDestroy {
  @Input() isTransparent = false;
  isAuthenticated = false;
  userRole: UserRole = 'customer';
  mobileMenuOpen = false;
  userMenuOpen = false;
  currentScreen = 'home';

  private subs: Subscription = new Subscription();

  readonly Building2 = Building2;
  readonly Menu = Menu;
  readonly X = X;
  readonly User = User;
  readonly Heart = Heart;
  readonly Plus = Plus;

  constructor(private authService: AuthService, private router: Router) { }

  ngOnInit() {
    this.subs.add(
      this.authService.isAuthenticated$.subscribe(isAuth => this.isAuthenticated = isAuth)
    );
    this.subs.add(
      this.authService.userRole$.subscribe(role => this.userRole = role)
    );
  }

  ngOnDestroy() {
    this.subs.unsubscribe();
  }

  publicNavItems = [
    { id: 'home', label: 'Home', link: '/' },
    { id: 'properties', label: 'Properties', link: '/search' },
    { id: 'agents', label: 'Our Agents', link: '/agents' },
    { id: 'about', label: 'About Us', link: '/about' },
    { id: 'contact', label: 'Contact', link: '/contact' },
  ];

  admin = [
    { id: 'dashboard', label: 'Dashboard', link: '/dashboard' },
    { id: 'manage-properties', label: 'Manage Properties', link: '/manage-properties' },
    { id: 'inquiries', label: 'Inquiries', link: '/inquiries' },
    { id: 'users', label: 'Users', link: '/users' },];

  customer = [
    { id: 'home', label: 'Home', link: '/home' },
    { id: 'search', label: 'Browse Properties', link: '/search' },
    { id: 'saved', label: 'Saved Properties', link: '/saved' },
    { id: 'my-inquiries', label: 'My Inquiries', link: '/my-inquiries' },
  ];
  owner = [
    { id: 'dashboard', label: 'Dashboard', link: '/dashboard' },
    { id: 'my-properties', label: 'My Properties', link: '/my-properties' },
    { id: 'inquiries', label: 'Inquiries', link: '/inquiries' },
    { id: 'profile', label: 'My Profile', link: '/profile' },
  ];
  agent = [
    { id: 'dashboard', label: 'Dashboard', link: '/dashboard' },
    { id: 'properties', label: 'My Properties', link: '/properties' },
    { id: 'add-property', label: 'Add Property', link: '/add-property' },
    { id: 'inquiries', label: 'Inquiries', link: '/inquiries' },
  ];

  getNavItems() {
    if (!this.isAuthenticated) return this.publicNavItems;
    switch (this.userRole) {
      case 'admin': return this.admin;
      case 'agent': return this.agent;
      case 'owner': return this.owner;
      case 'customer': return this.customer;
      default: return this.publicNavItems;
    }
  };
  
  navItems = this.getNavItems();

  toggleMobileMenu() {
    this.mobileMenuOpen = !this.mobileMenuOpen;
  }

  toggleUserMenu() {
    this.userMenuOpen = !this.userMenuOpen;
  }

  onLogin() {
    this.router.navigate(['/login']);
  }

  onLogout() {
    this.authService.logout();
    this.userMenuOpen = false;
    this.router.navigate(['/']);
  }
}

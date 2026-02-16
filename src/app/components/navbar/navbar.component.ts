import { Component, OnInit, OnDestroy, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterModule } from '@angular/router';
import { LucideAngularModule, Menu, X, User, Heart, Plus } from 'lucide-angular';
import { AuthService } from '../../service/auth.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [CommonModule, RouterModule, LucideAngularModule],
  templateUrl: './navbar.component.html',
})
export class NavbarComponent implements OnInit, OnDestroy {
  @Input() isTransparent = true;
  isAuthenticated = false;
  userRole: string = '';
  mobileMenuOpen = false;
  userMenuOpen = false;
  currentScreen = 'home';

  private subs: Subscription = new Subscription();

  readonly Menu = Menu;
  readonly X = X;
  readonly User = User;
  readonly Heart = Heart;
  readonly Plus = Plus;

  constructor(private authService: AuthService, private router: Router) { }

  ngOnInit() {
    this.subs.add(
      this.authService.isAuthenticated$.subscribe(isAuth => {
        this.isAuthenticated = isAuth;
        this.updateNavItems();
      })
    );

    this.subs.add(
      this.authService.userRole$.subscribe(role => {
        this.userRole = role;
        this.updateNavItems();
      })
    );
  }

  updateNavItems() {
    if (!this.isAuthenticated) {
      this.navItems = this.publicNavItems;
      return;
    }

    switch (this.userRole) {
      case 'admin': this.navItems = this.admin; break;
      case 'agent': this.navItems = this.agent; break;
      case 'owner': this.navItems = this.owner; break;
      case 'customer': this.navItems = this.customer; break;
      default: this.navItems = this.publicNavItems;
    }
  }

  ngOnDestroy() {
    this.subs.unsubscribe();
  }

  publicNavItems = [
    { id: 'home', label: 'Home', link: '/' },
    { id: 'properties', label: 'Properties', link: '/properties' },
    { id: 'contact', label: 'Contact', link: '/contact' },
  ];

  admin = [
    { id: 'dashboard', label: 'Dashboard', link: '/dashboard' },
    { id: 'manage-properties', label: 'Manage Properties', link: '/manage-properties' },
    { id: 'inquiries', label: 'Inquiries', link: '/inquiries' },
    { id: 'users', label: 'Users', link: '/users' },];

  customer = [
    { id: 'home', label: 'Home', link: '/' },
    { id: 'search', label: 'Browse Properties', link: '/properties' },
    { id: 'agents', label: 'Agents', link: '/agents' },
    { id: 'inquiries', label: 'My Inquiries', link: '/inquiries' },
  ];
  owner = [
    { id: 'search', label: 'Browse Properties', link: '/properties' },
    { id: 'my-properties', label: 'My Properties', link: '/my-properties' },
    { id: 'inquiries', label: 'Inquiries', link: '/inquiries' },
    { id: 'agents', label: 'Agents', link: '/contact-agents' },
  ];
  agent = [
    { id: 'search', label: 'Browse Properties', link: '/properties' },
    { id: 'inquiries', label: 'Inquiries', link: '/inquiries' },
    { id: 'owners', label: 'Owners', link: '/contact-owner' },
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

  onSignUp() {
    this.router.navigate(['/register']);
  }

  onLogout() {
    this.authService.logout();
    this.userMenuOpen = false;
    this.router.navigate(['/']);
  }
}

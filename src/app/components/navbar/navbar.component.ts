import { Component, OnInit, OnDestroy } from '@angular/core';
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

  get filteredNavItems() {
    if (this.userRole === 'admin') {
      return [
        { id: 'dashboard', label: 'Dashboard', link: '/dashboard' },
        { id: 'users', label: 'Users', link: '/users' },
        { id: 'settings', label: 'Settings', link: '/settings' },
      ];
    }
    return this.publicNavItems;
  }

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

import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

export type UserRole = 'customer' | 'owner' | 'agent' | 'admin';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private isAuthenticatedSubject = new BehaviorSubject<boolean>(false);
  isAuthenticated$ = this.isAuthenticatedSubject.asObservable();
  
  private userRoleSubject = new BehaviorSubject<UserRole>('customer');
  userRole$ = this.userRoleSubject.asObservable();

  private userNameSubject = new BehaviorSubject<string>('Rishindu Yohan');
  userName$ = this.userNameSubject.asObservable();

  constructor() { }

  login(role: UserRole, email: string = 'user@example.com') {
    this.isAuthenticatedSubject.next(true);
    this.userRoleSubject.next(role);
    if (role === 'admin') {
      this.userNameSubject.next('Admin User');
    } else {
      this.userNameSubject.next('Rishindu Yohan');
    }
  }

  logout() {
    this.isAuthenticatedSubject.next(false);
    this.userRoleSubject.next('customer');
    this.userNameSubject.next('Guest');
  }

  getCurrentRole(): UserRole {
    return this.userRoleSubject.value;
  }

  getIsAuthenticated(): boolean {
    return this.isAuthenticatedSubject.value;
  }
}

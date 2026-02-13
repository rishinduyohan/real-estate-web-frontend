import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { User } from '../model/user.model';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private isAuthenticatedSubject = new BehaviorSubject<boolean>(false);
  isAuthenticated$ = this.isAuthenticatedSubject.asObservable();
  
  private userRoleSubject = new BehaviorSubject<string>('customer');
  userRole$ = this.userRoleSubject.asObservable();

  private userNameSubject = new BehaviorSubject<string>('Rishindu Yohan');
  userName$ = this.userNameSubject.asObservable();

  constructor() { }

  login(user:User) {
  this.isAuthenticatedSubject.next(true);
  this.userRoleSubject.next(user.role);
    if (user.role === 'admin') {
      this.userNameSubject.next(user.fullName);
    } else {
      this.userNameSubject.next(user.fullName);
    }
  }

  logout() {
    this.isAuthenticatedSubject.next(false);
    this.userRoleSubject.next('customer');
    this.userNameSubject.next('Guest');
  }

  getCurrentRole() {
    return this.userRoleSubject.value;
  }

  getIsAuthenticated(): boolean {
    return this.isAuthenticatedSubject.value;
  }
}

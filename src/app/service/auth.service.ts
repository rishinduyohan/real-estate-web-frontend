import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, tap } from 'rxjs';
import { User } from '../model/user.model';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private authUrl = 'http://localhost:8080';

  private isAuthenticatedSubject = new BehaviorSubject<boolean>(this.hasToken());
  isAuthenticated$ = this.isAuthenticatedSubject.asObservable();

  private userRoleSubject = new BehaviorSubject<string>(localStorage.getItem('userRole') || 'customer');
  userRole$ = this.userRoleSubject.asObservable();

  private userNameSubject = new BehaviorSubject<string>(localStorage.getItem('userName') || 'Guest');
  userName$ = this.userNameSubject.asObservable();

  private userIdSubject = new BehaviorSubject<number>(Number(localStorage.getItem('userId')) || 0);
  userId$ = this.userIdSubject.asObservable();

  private user!:User;

  constructor(private http: HttpClient, private router: Router) { }

  private hasToken(): boolean {
    return !!localStorage.getItem('token');
  }

  login(credentials: { email: string; password: string }): Observable<any> {
    return this.http.post<any>(`${this.authUrl}/login`, credentials).pipe(
      tap((response: any) => {
        const token = response.token || response.jwt;
        const user = response.user || response;
        this.user = user;
        
        if (token) {
          localStorage.setItem('token', token);
          console.log(token);
          
        }
        localStorage.setItem('userRole', user.role);
        localStorage.setItem('userName', user.username );
        if (user.id) localStorage.setItem('userId', user.id.toString());

        this.isAuthenticatedSubject.next(true);
        this.userRoleSubject.next(user.role);
        this.userIdSubject.next(user.id );
        this.userNameSubject.next(user.username);
      })
    );
  }

  register(user: any): Observable<any> {
    return this.http.post<any>(`${this.authUrl}/register`, user);
  }

  logout() {
    localStorage.removeItem('token');
    localStorage.removeItem('userRole');
    localStorage.removeItem('userName');
    localStorage.removeItem('userId');

    this.isAuthenticatedSubject.next(false);
    this.userRoleSubject.next('customer');
    this.userNameSubject.next('Guest');
    this.userIdSubject.next(0);
    this.router.navigate(['/login']);
  }

  getCurrentUser():User{
    return this.user;
  }

  getCurrentRole() {
    return this.userRoleSubject.value;
  }

  getIsAuthenticated(): boolean {
    return this.isAuthenticatedSubject.value;
  }

  getCurrentUserId(): number {
    return this.userIdSubject.value;
  }
}

import { Component, OnInit, OnDestroy } from '@angular/core';
import { NavbarComponent } from '../../components/navbar/navbar.component';
import { HeroComponent } from '../../components/hero/hero.component';
import { RouterOutlet } from '@angular/router';
import { AuthService, UserRole } from '../../service/auth.service';
import { Subscription } from 'rxjs';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [NavbarComponent, RouterOutlet, HeroComponent, CommonModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent implements OnInit, OnDestroy {
  isAuthenticated = false;
  userName = '';
  private subs: Subscription = new Subscription();

  constructor(private authService: AuthService) { }

  ngOnInit() {
    this.subs.add(
      this.authService.isAuthenticated$.subscribe(isAuth => this.isAuthenticated = isAuth)
    );
    this.subs.add(
      this.authService.userName$.subscribe(name => this.userName = name)
    );
  }

  ngOnDestroy() {
    this.subs.unsubscribe();
  }

}

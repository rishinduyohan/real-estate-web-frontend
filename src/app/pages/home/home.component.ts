import { Component, OnInit, OnDestroy } from '@angular/core';
import { NavbarComponent } from '../../components/navbar/navbar.component';
import { HeroComponent } from '../../components/hero/hero.component';
import { StatsComponent } from '../../components/stats/stats.component';
import { FeaturedPropertiesComponent } from '../../components/featured-properties/featured-properties.component';
import { WhyChooseUsComponent } from '../../components/why-choose-us/why-choose-us.component';
import { ReviewsComponent } from '../../components/reviews/reviews.component';
import { CtaComponent } from '../../components/cta/cta.component';
import { RouterOutlet } from '@angular/router';
import { AuthService, UserRole } from '../../service/auth.service';
import { Subscription } from 'rxjs';
import { CommonModule } from '@angular/common';
import { FooterComponent } from '../../components/footer/footer.component';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [NavbarComponent, RouterOutlet, HeroComponent, StatsComponent, FeaturedPropertiesComponent, WhyChooseUsComponent, ReviewsComponent, CtaComponent, CommonModule,FooterComponent],
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

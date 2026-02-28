import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { LucideAngularModule, Search, SlidersHorizontal, Bell, MapPin } from 'lucide-angular';
import { User } from '../../model/user.model';
import { AuthService } from '../../service/auth.service';
import { Subscription } from 'rxjs';
import { Router, RouterModule } from '@angular/router';


@Component({
  selector: 'app-user-hero',
  imports: [CommonModule, LucideAngularModule,RouterModule],
  templateUrl: './user-hero.html',
})
export class UserHero implements OnInit {
  private subs: Subscription = new Subscription();

  constructor(private authService: AuthService,private router:Router) { }

  user!: User;

  ngOnInit() {
    this.subs.add(
      this.authService.userName$.subscribe(name => {
        this.user = { ...this.user };
        this.user.username = name;
      })
    );
  }

  readonly Search = Search;
  readonly SlidersHorizontal = SlidersHorizontal;
  readonly MapPin = MapPin;
  readonly Bell = Bell;

  locations = [
    { id: 'colombo', name: 'Colombo', count: 245 },
    { id: 'kandy', name: 'Kandy', count: 89 },
    { id: 'galle', name: 'Galle', count: 67 },
    { id: 'negombo', name: 'Negombo', count: 54 },
  ];



  onSearchClick() {
    this.router.navigate(['/properties']);
  }

}

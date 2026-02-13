import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { LucideAngularModule, Search, SlidersHorizontal, Bell, MapPin } from 'lucide-angular';
import { User } from '../../model/user.model';
import { AuthService } from '../../service/auth.service';
import { Subscription } from 'rxjs';


@Component({
  selector: 'app-user-hero',
  imports: [CommonModule,LucideAngularModule],
  templateUrl: './user-hero.html',
})
export class UserHero implements OnInit{
   private subs: Subscription = new Subscription();

  constructor(private authService: AuthService){}

  user:User = {
    id:1,
    fullName:"User Name",
    image:"jebnheoiujndfiem",
    email:"example@gmail.com",
    password:"123455",
    phone:"1234567890",
    role:"customer",
    createdDate:new Date()
  };

  ngOnInit(){
     this.subs.add(
      this.authService.userName$.subscribe(name => {
       this.user.fullName = name;
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
    console.log('Search clicked');
  }

}

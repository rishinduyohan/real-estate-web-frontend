import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { LucideAngularModule, Search, SlidersHorizontal, Bell, MapPin } from 'lucide-angular';
import { User } from '../../model/user.model';


@Component({
  selector: 'app-user-hero',
  imports: [CommonModule,LucideAngularModule],
  templateUrl: './user-hero.html',
  styleUrl: './user-hero.css',
})
export class UserHero {

  user:User = {
    id:1,
    fullName:"User Name",
    email:"example@gmail.com",
    password:"123455",
    phone:"1234567890",
    role:"customer",
    createdDate:new Date()
  };
  
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

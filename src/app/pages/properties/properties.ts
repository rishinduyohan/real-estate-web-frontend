import { Component, inject, OnInit } from '@angular/core';
import { PropertyService } from '../../service/property-service.service';
import { Property } from '../../model/property.model';
import { LucideAngularModule,Search, SlidersHorizontal } from 'lucide-angular';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { NavbarComponent } from '../../components/navbar/navbar.component';
import { FooterComponent } from '../../components/footer/footer.component';
import { PropertyCard } from '../../components/property-card/property-card';

@Component({
  selector: 'app-properties',
  imports: [CommonModule, FormsModule, LucideAngularModule,NavbarComponent,FooterComponent, PropertyCard],
  templateUrl: './properties.html',
  styleUrl: './properties.css',
})
export class Properties implements OnInit{

  properties : Property[] = [];
  searchQuery = ''
  activeFilter = ''

  readonly Search = Search;
  readonly SlidersHorizontal = SlidersHorizontal;

  constructor(private propertyService : PropertyService){
  }

  ngOnInit(){
    this.propertyService.getProperties().subscribe(
      response =>{
        console.log(response);
        this.properties = response
      }
    );
  }

  filteredProperties(){
    console.log('filter');
    
  }

  
}

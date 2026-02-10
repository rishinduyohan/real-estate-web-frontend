import { Component, inject, model, OnInit } from '@angular/core';
import { PropertyService } from '../../service/property-service.service';
import { Property } from '../../model/property.model';
import { LucideAngularModule, Search, SlidersHorizontal, ArrowRight } from 'lucide-angular';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { NavbarComponent } from '../../components/navbar/navbar.component';
import { FooterComponent } from '../../components/footer/footer.component';
import { PropertyCard } from '../../components/property-card/property-card';
import { map, Observable } from 'rxjs';

@Component({
  selector: 'app-properties',
  imports: [CommonModule, FormsModule, LucideAngularModule, PropertyCard,NavbarComponent,FooterComponent],
  templateUrl: './properties.html',
  styleUrl: './properties.css',
})
export class Properties implements OnInit {

  properties: Property[] = [];
  searchQuery = ''
  activeFilter = 'all'

  readonly Search = Search;
  readonly SlidersHorizontal = SlidersHorizontal;
  readonly ArrowRight = ArrowRight;

  constructor(private propertyService: PropertyService) {
  }

  ngOnInit() {
    this.propertyService.getProperties().pipe(
      map(res => res.slice(0, 9))
    ).subscribe(
      response => {
        console.log(response);
        this.properties = response
      }
    );
  }

  get filteredProperties() {
    return this.properties.filter(prop =>{
      const searching = prop.title.toLowerCase().includes(this.searchQuery.toLowerCase()) || prop.location.toLowerCase().includes(this.searchQuery.toLowerCase());
      const types = this.activeFilter === 'all' || this.activeFilter === prop.type.toLowerCase();
      return searching && types; 
    })
  }

  calculateProperties(): string {
    return this.filteredProperties.length.toString();
  }

  seeMoreClick() {
    this.propertyService.getProperties().subscribe(res => {
      this.properties = res;
    });
  }


}

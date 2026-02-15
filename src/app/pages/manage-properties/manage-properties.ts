import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { PropertyService } from '../../service/property-service.service';
import { Property } from '../../model/property.model';
import { NavbarComponent } from '../../components/navbar/navbar.component';
import { PropertyTable } from '../../components/property-table/property-table';

@Component({
    selector: 'app-manage-properties',
    standalone: true,
    imports: [CommonModule, RouterModule, FormsModule,NavbarComponent,PropertyTable],
    templateUrl: './manage-properties.html',
    styleUrls: [] 
})
export class ManageProperties implements OnInit {
  properties: Property[] = [];
  filteredProperties: Property[] = [];
  searchQuery: string = '';

  constructor(private propertyService: PropertyService) { }

  ngOnInit(): void {
    this.loadAll();
  }

  loadAll(): void {
    this.propertyService.getProperties().subscribe(res => {
      this.properties = res;
      this.applyFilter(); 
    });
  }

  applyFilter(): void {
    if (!this.searchQuery) {
      this.filteredProperties = this.properties;
    } else {
      const query = this.searchQuery.toLowerCase();
      this.filteredProperties = this.properties.filter(p =>
        p.title.toLowerCase().includes(query) ||
        p.location.toLowerCase().includes(query) ||
        p.type.toLowerCase().includes(query)
      );
    }
  }

  onDelete(id: number): void {
    this.propertyService.deleteProperty(id).subscribe(() => {
      this.loadAll();
    });
  }
}
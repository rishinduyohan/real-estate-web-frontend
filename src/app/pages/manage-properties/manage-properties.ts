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
        this.loadProperties();
    }

    loadProperties(): void {
        this.propertyService.getProperties().subscribe(properties => {
            this.properties = properties;
            this.filterProperties();
        });
    }

    filterProperties(): void {
        if (!this.searchQuery) {
            this.filteredProperties = this.properties;
        } else {
            const query = this.searchQuery.toLowerCase();
            this.filteredProperties = this.properties.filter(property =>
                property.title.toLowerCase().includes(query) ||
                property.location.toLowerCase().includes(query) ||
                property.type.toLowerCase().includes(query)
            );
        }
    }

    deleteProperty(id: number): void {
        if (confirm('Are you sure you want to delete this property?')) {
            this.propertyService.deleteProperty(id).subscribe(() => {
                this.loadProperties(); // Reload list after deletion
            });
        }
    }
}

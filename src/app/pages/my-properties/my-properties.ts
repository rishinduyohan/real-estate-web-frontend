import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { PropertyService } from '../../service/property-service.service';
import { Property } from '../../model/property.model';
import { NavbarComponent } from '../../components/navbar/navbar.component';
import { PropertyTable } from '../../components/property-table/property-table';
import { AuthService } from '../../service/auth.service';
import { LucideAngularModule, Search } from 'lucide-angular';
import { AddPropertyComponent } from '../../components/add-property/add-property';

@Component({
    selector: 'app-my-properties',
    standalone: true,
    imports: [CommonModule, RouterModule, FormsModule, NavbarComponent, PropertyTable, LucideAngularModule,AddPropertyComponent],
    templateUrl: './my-properties.html',
    styleUrls: []
})
export class MyProperties implements OnInit {
    properties: Property[] = [];
    filteredProperties: Property[] = [];
    searchQuery: string = '';

    readonly Search = Search;

    constructor(
        private propertyService: PropertyService,
        private authService: AuthService
    ) { }

    ngOnInit(): void {
        this.loadMyProperties();
    }

    loadMyProperties(): void {
        const userId = this.authService.getCurrentUserId();
        this.propertyService.getProperties().subscribe(res => {
            // Filter properties by ownerId matching current user's ID
            this.properties = res.filter(p => p.ownerId === userId);
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
            this.loadMyProperties();
        });
    }
}

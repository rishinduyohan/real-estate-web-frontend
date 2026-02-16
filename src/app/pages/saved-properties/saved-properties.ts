import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavbarComponent } from '../../components/navbar/navbar.component';
import { PropertyCard } from '../../components/property-card/property-card';
import { PropertyService } from '../../service/property-service.service';
import { AuthService } from '../../service/auth.service';
import { Property } from '../../model/property.model';
import { Router } from '@angular/router';

@Component({
    selector: 'app-saved-properties',
    standalone: true,
    imports: [CommonModule, NavbarComponent, PropertyCard],
    templateUrl: './saved-properties.html',
})
export class SavedProperties implements OnInit {
    savedProperties: Property[] = [];
    loading = true;

    constructor(
        private propertyService: PropertyService,
        private authService: AuthService,
        private router: Router
    ) { }

    ngOnInit() {
        this.loadSavedProperties();
    }

    loadSavedProperties() {
        const userId = this.authService.getCurrentUserId();
        this.propertyService.getSavedProperties(userId).subscribe(properties => {
            this.savedProperties = properties;
            this.loading = false;
        });
    }

    onPropertyClick(id: string) {
        this.router.navigate(['/propertyDetail', id]);
    }
}

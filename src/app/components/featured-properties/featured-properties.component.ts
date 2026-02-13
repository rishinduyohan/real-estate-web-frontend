import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PropertyCard } from '../property-card/property-card';
import { LucideAngularModule, ArrowRight } from 'lucide-angular';
import { Property } from '../../model/property.model';
import { PropertyService } from '../../service/property-service.service';
import { map } from 'rxjs/operators';

@Component({
    selector: 'app-featured-properties',
    standalone: true,
    imports: [CommonModule, PropertyCard, LucideAngularModule],
    templateUrl: './featured-properties.component.html',
})
export class FeaturedPropertiesComponent implements OnInit {
    readonly ArrowRight = ArrowRight;

    featuredProperties: Property[] = [];

    constructor(private propertyService:PropertyService){

    }

    ngOnInit() {
        this.propertyService.getProperties().pipe(
            map(res=> res.slice(0,4))
        ).subscribe(res => {
            console.log(res);
            this.featuredProperties = res;
        });
    }


    onPropertyClick(id: string) {
        console.log('Property clicked:', id);
        // Navigate to property details
    }
}

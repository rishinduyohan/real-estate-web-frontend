import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PropertyCard } from '../property-card/property-card';
import { LucideAngularModule, ArrowRight } from 'lucide-angular';
import { Property } from '../../model/property.model';
import { PropertyService } from '../../service/property-service.service';
import { map } from 'rxjs/operators';
import { Router, RouterModule } from '@angular/router';

@Component({
    selector: 'app-featured-properties',
    standalone: true,
    imports: [CommonModule, PropertyCard, LucideAngularModule,RouterModule],
    templateUrl: './featured-properties.component.html',
})
export class FeaturedPropertiesComponent implements OnInit {
    readonly ArrowRight = ArrowRight;

    featuredProperties: Property[] = [];

    constructor(private propertyService:PropertyService,private router: Router){

    }

    ngOnInit() {
        this.propertyService.getProperties().pipe(
            map(res=> res.slice(0,4))
        ).subscribe(res => {
            this.featuredProperties = res;
        });
    }


    onPropertyClick(id: string) {
        console.log('Property clicked:', id);
    }

    onViewAllProperties(){
        this.router.navigate(['/properties']);
    }
}

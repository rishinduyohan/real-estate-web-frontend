import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PropertyCard, PropertyCardProps } from '../property-card/property-card';
import { LucideAngularModule, ArrowRight } from 'lucide-angular';

@Component({
    selector: 'app-featured-properties',
    standalone: true,
    imports: [CommonModule, PropertyCard, LucideAngularModule],
    templateUrl: './featured-properties.component.html',
})
export class FeaturedPropertiesComponent {
    readonly ArrowRight = ArrowRight;

    featuredProperties: PropertyCardProps[] = [
        {
            id: '1',
            title: 'Luxury Villa in Colombo 7',
            location: 'Colombo 7, Colombo',
            price: '125,000,000',
            bedrooms: 5,
            bathrooms: 4,
            area: '4,500 sq ft',
            type: 'House',
            status: 'For Sale',
            image: 'https://images.unsplash.com/photo-1613977257363-707ba9348227?auto=format&fit=crop&q=80&w=800'
        },
        {
            id: '2',
            title: 'Modern Apartment with City View',
            location: 'Rajagiriya, Colombo',
            price: '45,000,000',
            bedrooms: 3,
            bathrooms: 2,
            area: '1,800 sq ft',
            type: 'Apartment',
            status: 'For Sale',
            image: 'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?auto=format&fit=crop&q=80&w=800'
        },
        {
            id: '3',
            title: 'Beautiful Family House',
            location: 'Nugegoda, Colombo',
            price: '75,000,000',
            bedrooms: 4,
            bathrooms: 3,
            area: '3,200 sq ft',
            type: 'House',
            status: 'For Sale',
            image: 'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&q=80&w=800'
        },
        {
            id: '4',
            title: 'Tropical Villa with Pool',
            location: 'Mount Lavinia, Colombo',
            price: '180,000/month',
            bedrooms: 4,
            bathrooms: 3,
            area: '3,800 sq ft',
            type: 'House',
            status: 'For Rent',
            image: 'https://images.unsplash.com/photo-1572120360610-d971b9d7767c?auto=format&fit=crop&q=80&w=800'
        }
    ];

    onPropertyClick(id: string) {
        console.log('Property clicked:', id);
        // Navigate to property details
    }
}

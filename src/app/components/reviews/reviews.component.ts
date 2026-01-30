import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LucideAngularModule, User, Star } from 'lucide-angular';

@Component({
    selector: 'app-reviews',
    standalone: true,
    imports: [CommonModule, LucideAngularModule],
    templateUrl: './reviews.component.html',
    styleUrl: './reviews.component.css'
})
export class ReviewsComponent {
    readonly User = User;
    readonly Star = Star;

    reviews = [
        {
            name: 'Rajesh Kumar',
            role: 'Property Buyer',
            review: 'LK Estate helped me find my dream home in Colombo. The process was smooth and the agents were very professional.'
        },
        {
            name: 'Ayesha Fernando',
            role: 'Property Seller',
            review: 'Sold my property within 2 weeks! The platform is user-friendly and the support team is excellent.'
        },
        {
            name: 'Nimal Perera',
            role: 'Renter',
            review: 'Found the perfect apartment for my family. Great selection and responsive agents.'
        }
    ];

    stars = [1, 2, 3, 4, 5];
}

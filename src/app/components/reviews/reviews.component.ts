import { CommonModule } from '@angular/common';
import { Component, ElementRef, ViewChild } from '@angular/core';
import { User, Star, ChevronLeft, ChevronRight, LucideAngularModule } from 'lucide-angular';

@Component({
    selector: 'app-reviews',
    standalone: true,
    imports: [CommonModule, LucideAngularModule],
    styleUrl: 'reviews.component.css',
    templateUrl: './reviews.component.html',
})
export class ReviewsComponent {
    readonly User = User;
    readonly Star = Star;
    readonly ChevronLeft = ChevronLeft;
    readonly ChevronRight = ChevronRight;

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

    @ViewChild('scrollContainer') scrollContainer!: ElementRef;

    scroll(direction: 'left' | 'right') {
        const container = this.scrollContainer.nativeElement;
        const scrollAmount = 400;
        container.scrollBy({
            left: direction === 'left' ? -scrollAmount : scrollAmount,
            behavior: 'smooth'
        });

    }
}

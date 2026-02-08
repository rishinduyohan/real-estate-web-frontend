import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LucideAngularModule, Building2, Users, TrendingUp, Star, Building2Icon } from 'lucide-angular';

@Component({
    selector: 'app-stats',
    standalone: true,
    imports: [CommonModule, LucideAngularModule],
    templateUrl: './stats.component.html',
})
export class StatsComponent {
    readonly Building2 = Building2;
    readonly Users = Users;
    readonly TrendingUp = TrendingUp;
    readonly Star = Star;

    stats = [
        {
            icon: Building2,
            count: '10,000+',
            label: 'Properties Listed'
        },
        {
            icon: Users,
            count: '50,000+',
            label: 'Happy Customers'
        },
        {
            icon: TrendingUp,
            count: '5,000+',
            label: 'Properties Sold'
        },
        {
            icon: Star,
            count: '4.9/5',
            label: 'Customer Rating'
        }
    ];
}

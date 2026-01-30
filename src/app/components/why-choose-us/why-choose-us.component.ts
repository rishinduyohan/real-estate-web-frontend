import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LucideAngularModule, Building2, Users, CheckCircle } from 'lucide-angular';

@Component({
    selector: 'app-why-choose-us',
    standalone: true,
    imports: [CommonModule, LucideAngularModule],
    templateUrl: './why-choose-us.component.html',
    styleUrl: './why-choose-us.component.css'
})
export class WhyChooseUsComponent {
    readonly Building2 = Building2;
    readonly Users = Users;
    readonly CheckCircle = CheckCircle;

    features = [
        {
            icon: Building2,
            title: 'Wide Range of Properties',
            description: 'Browse through thousands of verified properties across Sri Lanka'
        },
        {
            icon: Users,
            title: 'Trusted Agents',
            description: 'Connect with experienced and certified real estate professionals'
        },
        {
            icon: CheckCircle,
            title: 'Easy Process',
            description: 'Simple and transparent property buying, selling, and renting process'
        }
    ];
}

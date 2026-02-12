import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
    selector: 'app-why-choose-us',
    standalone: true,
    imports: [CommonModule, ],
    styleUrl: './why-choose-us.component.css',
    templateUrl: './why-choose-us.component.html',
})
export class WhyChooseUsComponent {

    features = [
        {
            icon: "https://res.cloudinary.com/dbndqriih/image/upload/logo_hokeaw",
            title: 'Wide Range of Properties',
            description: 'Browse through thousands of verified properties across Sri Lanka'
        },
        {
            icon: "https://res.cloudinary.com/dbndqriih/image/upload/136528126_77a00bd6-65f1-421c-8ae5-a2251b7b3802_iz7nie",
            title: 'Trusted Agents',
            description: 'Connect with experienced and certified real estate professionals'
        },
        {
            icon: "https://res.cloudinary.com/dbndqriih/image/upload/12083138_Wavy_Bus-06_Single-09_xq9ops",
            title: 'Easy Process',
            description: 'Simple and transparent property buying, selling, and renting process'
        }
    ];
}

import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LucideAngularModule, Search } from 'lucide-angular';

@Component({
    selector: 'app-hero',
    standalone: true,
    imports: [CommonModule, LucideAngularModule],
    templateUrl: './hero.component.html',
    styleUrl: './hero.component.css'
})
export class HeroComponent {
    readonly Search = Search;

    propertyType = 'All Property Types';
}

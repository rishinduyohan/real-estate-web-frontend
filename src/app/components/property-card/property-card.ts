import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LucideAngularModule, MapPin, Bed, Bath, Maximize } from 'lucide-angular';

@Component({
  selector: 'app-property-card',
  standalone: true,
  imports: [CommonModule, LucideAngularModule],
  templateUrl: './property-card.html',
  styleUrl: './property-card.css'
})
export class PropertyCard {
  @Input() id!: string;
  @Input() image!: string;
  @Input() title!: string;
  @Input() price!: string;
  @Input() location!: string;
  @Input() bedrooms: number = 0;
  @Input() bathrooms: number = 0;
  @Input() area!: string;
  @Input() type: 'House' | 'Apartment' | 'Land' | 'Commercial' = 'House';
  @Input() status: 'For Sale' | 'For Rent' = 'For Sale';

  @Output() cardClick = new EventEmitter<string>();

  readonly MapPin = MapPin;
  readonly Bed = Bed;
  readonly Bath = Bath;
  readonly Maximize = Maximize;

  onCardClick() {
    this.cardClick.emit(this.id);
  }
}

export interface PropertyCardProps {
  id: string;
  image: string;
  title: string;
  price: string;
  location: string;
  bedrooms: number;
  bathrooms: number;
  area: string;
  type: 'House' | 'Apartment' | 'Land' | 'Commercial';
  status?: 'For Sale' | 'For Rent';
  onClick?: () => void;
}

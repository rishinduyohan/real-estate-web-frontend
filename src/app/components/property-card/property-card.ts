import { Component, Input, Output, EventEmitter, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LucideAngularModule, MapPin, Bed, Bath, Maximize, Check, List, Info } from 'lucide-angular';
import { Property } from '../../model/property.model';

@Component({
  selector: 'app-property-card',
  standalone: true,
  imports: [CommonModule, LucideAngularModule],
  templateUrl: './property-card.html',
})
export class PropertyCard {

  @Input() id!: string;
  @Input() image!: string;
  @Input() title!: string;
  @Input() size!: string;
  @Input() description!: string;
  @Input() price!: number;
  @Input() area!: string;
  @Input() type!:string;
  @Input() status!:string;
  @Input() bedrooms!:number;
  @Input() bathrooms!:number;


  @Output() cardClick = new EventEmitter<string>();

  readonly MapPin = MapPin;
  readonly Bed = Bed;
  readonly Bath = Bath;
  readonly Maximize = Maximize;

  onCardClick() {
    this.cardClick.emit(this.id);
  }
}

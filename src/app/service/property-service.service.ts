import { inject, Injectable } from '@angular/core';
import { Property } from '../model/property.model';
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class PropertyService {

  private propertyData: Property[] = [
  {
    id: 1,
    image: 'https://images.unsplash.com/photo-1706808849780-7a04fbac83ef?w=800',
    title: 'Luxury Villa in Colombo 7',
    type: 'House',
    location: 'Colombo 7, Colombo',
    price: 125000000,
    size: '4,500 sq ft',
    status: 'Available',
    ownerId: 101,
    details: {
      bedrooms: 5,
      bathrooms: 4,
      description: 'A beautiful luxury villa located in the heart of Colombo 7.'
    }
  },
  {
    id: 2,
    image: 'https://images.unsplash.com/photo-1515263487990-61b07816b324?w=800',
    title: 'Modern Apartment with City View',
    type: 'Apartment',
    location: 'Rajagiriya, Colombo',
    price: 45000000,
    size: '1,800 sq ft',
    status: 'Available',
    ownerId: 102,
    details: {
      bedrooms: 3,
      bathrooms: 2,
      description: 'Modern apartment with a stunning view of the city skyline.'
    }
  },
  {
    id: 3,
    image: 'https://images.unsplash.com/photo-1722653448286-a31730b21920?w=800',
    title: 'Beautiful Family House',
    type: 'House',
    location: 'Nugegoda, Colombo',
    price: 75000000,
    size: '3,200 sq ft',
    status: 'Available',
    ownerId: 103,
    details: {
      bedrooms: 4,
      bathrooms: 3,
      description: 'Spacious family home in a quiet neighborhood.'
    }
  },
  {
    id: 4,
    image: 'https://images.unsplash.com/photo-1651108066220-f61c22fc281f?w=800',
    title: 'Tropical Villa with Pool',
    type: 'House',
    location: 'Mount Lavinia, Colombo',
    price: 180000,
    size: '3,800 sq ft',
    status: 'Rented',
    ownerId: 104,
    details: {
      bedrooms: 4,
      bathrooms: 3,
      description: 'Tropical paradise villa with a private swimming pool.'
    }
  },
  {
    id: 5,
    image: 'https://images.unsplash.com/photo-1677324574457-645566fea332?w=800',
    title: 'Residential Land - Galle',
    type: 'Land',
    location: 'Galle, Southern Province',
    price: 12500000,
    size: '15 perches',
    status: 'Available',
    ownerId: 105,
    details: {
      bedrooms: 0,
      bathrooms: 0,
      description: 'Prime residential land perfect for building your dream home.'
    }
  },
  {
    id: 6,
    image: 'https://images.unsplash.com/photo-1580587767526-d3c21d00d624?w=800',
    title: 'Beachfront Apartment',
    type: 'Apartment',
    location: 'Hikkaduwa, Southern Province',
    price: 35000000,
    size: '1,200 sq ft',
    status: 'Available',
    ownerId: 106,
    details: {
      bedrooms: 2,
      bathrooms: 2,
      description: 'Relaxing beachfront apartment with panoramic ocean views.'
    }
  },
  {
    id: 7,
    image: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=800',
    title: 'Eco-Friendly Bungalow',
    type: 'House',
    location: 'Ella, Uva Province',
    price: 55000000,
    size: '2,500 sq ft',
    status: 'Available',
    ownerId: 107,
    details: {
      bedrooms: 3,
      bathrooms: 2,
      description: 'Eco-friendly bungalow surrounded by lush greenery.'
    }
  },
  {
    id: 8,
    image: 'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=800',
    title: 'Luxury Penthouse',
    type: 'Apartment',
    location: 'Colombo 3, Colombo',
    price: 250000000,
    size: '5,500 sq ft',
    status: 'Available',
    ownerId: 108,
    details: {
      bedrooms: 4,
      bathrooms: 4,
      description: 'Exclusive penthouse in the tallest skyscraper in Colombo.'
    }
  },
  {
    id: 9,
    image: 'https://images.unsplash.com/photo-1500382017468-9049fed747ef?w=800',
    title: 'Coconut Plantation Land',
    type: 'Land',
    location: 'Kurunegala, North Western',
    price: 8500000,
    size: '2 Acres',
    status: 'Available',
    ownerId: 109,
    details: {
      bedrooms: 0,
      bathrooms: 0,
      description: 'Highly productive coconut plantation land for sale.'
    }
  },
  {
    id: 10,
    image: 'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=800',
    title: 'Suburban Family Home',
    type: 'House',
    location: 'Malabe, Colombo',
    price: 32000000,
    size: '2,200 sq ft',
    status: 'Sold',
    ownerId: 110,
    details: {
      bedrooms: 3,
      bathrooms: 2,
      description: 'Modern family home located in a rapidly developing suburb.'
    }
  }
];

  constructor(){}

  public getProperties():Observable<Property[]>{
    return of (this.propertyData);
  }
}

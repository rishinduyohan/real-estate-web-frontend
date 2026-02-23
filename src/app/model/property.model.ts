export interface Property {
    id?: number;
    title: string;
    type: 'House' | 'Apartment' | 'Land';
    location: string;
    price: number;
    size: string;
    status: 'Available' | 'Sold' | 'Rented';
    images: string[]; 
    ownerId: number;
    ownerName?: string; 
    details: PropertyDetails;
}

export interface PropertyDetails {
    bedrooms: number;
    bathrooms: number;
    description: string;
}
export interface Property {
    id?: number;
    title: string;
    type: 'HOUSE' | 'APARTMENT' | 'LAND';
    location: string;
    price: number;
    size: string;
    status: 'AVAILABLE' | 'SOLD' | 'RENTED';
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
export interface Property{
    id:number;
    image:string;
    title:string;
    type:'House'|'Apartment'|'Land';
    location:string;
    price:number;
    size:string;
    status:'Available'|'Sold'|'Rented';
    details:PropertyDetails;
    ownerId:number;
}

export interface PropertyDetails{
    bedrooms:number;
    bathrooms:number;
    description:string;
    images:string[];
}
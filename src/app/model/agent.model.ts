import { Owner } from "./owner.model";

export interface Agent {
    id: number;
    image: string;
    name: string;
    location: string;
    phone: string;
    email: string;
    details: agentDetails;
    owner: Owner
}

interface agentDetails {
    listings: number;
    sold: number;
    experience: number;
    rating: number;
    reviews: number;
}
import { Property } from "./property.model";

export interface User {
    id?: number;
    username: string;
    email: string;
    password?: string;
    phone?: string;
    imageUrl?: string;
    role?: string;
    createdAt?: Date;

    properties?: Property[];
}
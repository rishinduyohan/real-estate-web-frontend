export interface Inquiry {
    id: number;
    name: string;
    email: string;
    phone: string;
    message: string;
    propertyId?: number;
    propertyTitle?: string;
    status: 'New' | 'In Progress' | 'Responded';
    date: Date;
    reply?: string;
}

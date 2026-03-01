export interface Inquiry {
    id: number;
    name: string;
    email: string;
    phone: string;
    message: string;
    propertyId?: number;
    propertyTitle?: string;
    status: 'NEW' | 'IN_PROGRESS' | 'RESPONDED';
    date: Date;
    reply?: string;
    customerId?: number;
    customerImageUrl?: string;
}

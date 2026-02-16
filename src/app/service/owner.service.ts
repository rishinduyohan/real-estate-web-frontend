import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Owner } from '../model/owner.model';

@Injectable({
    providedIn: 'root'
})
export class OwnerService {
    private owners: Owner[] = [
        {
            id: 101,
            name: 'LK Holdings',
            location: 'Colombo 03',
            image: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?w=400',
            phone: '+94 11 234 5678',
            email: 'admin@lkholdings.com',
            properties: [1, 8]
        },
        {
            id: 102,
            name: 'Central Properties',
            location: 'Kandy Town',
            image: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?w=400',
            phone: '+94 81 234 5678',
            email: 'info@centralprop.lk',
            properties: [2]
        },
        {
            id: 103,
            name: 'Southern Real Estate',
            location: 'Galle Fort',
            image: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400',
            phone: '+94 91 234 5678',
            email: 'sales@southernre.lk',
            properties: [5, 6, 7]
        },
        {
            id: 104,
            name: 'Mount Views',
            location: 'Mount Lavinia',
            image: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=400',
            phone: '+94 11 456 7890',
            email: 'mount@views.lk',
            properties: [4]
        },
        {
            id: 105,
            name: 'Wayamba Lands',
            location: 'Kurunegala Town',
            image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400',
            phone: '+94 37 234 5678',
            email: 'wayamba@land.lk',
            properties: [9]
        },
        {
            id: 106,
            name: 'Elite Homes SL',
            location: 'Colombo 07',
            image: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=400',
            phone: '+94 11 999 8888',
            email: 'elite@homes.lk',
            properties: []
        },
        {
            id: 107,
            name: 'Northern Realty',
            location: 'Jaffna',
            image: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400',
            phone: '+94 21 234 5678',
            email: 'jaffna@realty.lk',
            properties: []
        },
        {
            id: 108,
            name: 'Sky High Developers',
            location: 'Colombo 3',
            image: 'https://images.unsplash.com/photo-1556157382-97eda2d6229b?w=400',
            phone: '+94 11 555 6666',
            email: 'sales@skyhigh.lk',
            properties: [8]
        },
        {
            id: 109,
            name: 'Green Plantations',
            location: 'Kurunegala',
            image: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=400',
            phone: '+94 37 555 4444',
            email: 'info@greenplant.lk',
            properties: [9]
        },
        {
            id: 110,
            name: 'Suburban Living',
            location: 'Malabe',
            image: 'https://images.unsplash.com/photo-1527980965255-d3b416303d12?w=400',
            phone: '+94 11 222 3333',
            email: 'contact@suburban.lk',
            properties: [10]
        }
    ];

    constructor() { }

    getOwners(): Observable<Owner[]> {
        return of(this.owners);
    }

    getOwnerById(id: number): Observable<Owner | undefined> {
        return of(this.owners.find(o => o.id === id));
    }

    addOwner(owner: Owner): Observable<void> {
        this.owners.push(owner);
        return of(void 0);
    }

    updateOwner(owner: Owner): Observable<void> {
        const index = this.owners.findIndex(o => o.id === owner.id);
        if (index !== -1) {
            this.owners[index] = owner;
        }
        return of(void 0);
    }

    deleteOwner(id: number): Observable<void> {
        this.owners = this.owners.filter(o => o.id !== id);
        return of(void 0);
    }
}

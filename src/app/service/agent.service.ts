import { inject, Injectable } from '@angular/core';
import { Agent } from '../model/agent.model';
import { Observable, of } from 'rxjs';

@Injectable({
    providedIn: 'root',
})
export class AgentService {
    private agents: Agent[] = [
        {
            id: 1,
            image: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&w=800&q=80',
            name: 'Nimal Perera',
            location: 'Colombo',
            phone: '+94 77 123 4567',
            email: 'nimal@lkestate.lk',
            details: { listings: 145, sold: 89, experience: 12, rating: 4.9, reviews: 127 }
        },
        {
            id: 2,
            image: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=800&q=80',
            name: 'Ayesha Fernando',
            location: 'Kandy',
            phone: '+94 77 234 5678',
            email: 'ayesha@lkestate.lk',
            details: { listings: 98, sold: 54, experience: 8, rating: 4.8, reviews: 89 }
        },
        {
            id: 3,
            image: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&w=800&q=80',
            name: 'Sunil Silva',
            location: 'Galle',
            phone: '+94 77 345 6789',
            email: 'sunil@lkestate.lk',
            details: { listings: 203, sold: 142, experience: 15, rating: 5.0, reviews: 156 }
        },
        {
            id: 4,
            image: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&w=800&q=80',
            name: 'Chamari Atapattu',
            location: 'Negombo',
            phone: '+94 77 456 7890',
            email: 'chamari@lkestate.lk',
            details: { listings: 45, sold: 32, experience: 5, rating: 4.7, reviews: 64 }
        },
        {
            id: 5,
            image: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?auto=format&fit=crop&w=800&q=80',
            name: 'Kasun Rajitha',
            location: 'Kurunegala',
            phone: '+94 77 567 8901',
            email: 'kasun@lkestate.lk',
            details: { listings: 78, sold: 21, experience: 6, rating: 4.6, reviews: 42 }
        },
        {
            id: 6,
            image: 'https://images.unsplash.com/photo-1567532939604-b6b5b0db2604?auto=format&fit=crop&w=800&q=80',
            name: 'Dilani Mendis',
            location: 'Colombo 07',
            phone: '+94 77 678 9012',
            email: 'dilani@lkestate.lk',
            details: { listings: 34, sold: 28, experience: 10, rating: 4.9, reviews: 110 }
        },
        {
            id: 7,
            image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=800&q=80',
            name: 'Rohan Gunaratne',
            location: 'Jaffna',
            phone: '+94 77 789 0123',
            email: 'rohan@lkestate.lk',
            details: { listings: 56, sold: 15, experience: 4, rating: 4.5, reviews: 38 }
        },
        {
            id: 8,
            image: 'https://images.unsplash.com/photo-1551836022-d5d88e9218df?auto=format&fit=crop&w=800&q=80',
            name: 'Priyani Cooray',
            location: 'Mount Lavinia',
            phone: '+94 77 890 1234',
            email: 'priyani@lkestate.lk',
            details: { listings: 112, sold: 70, experience: 9, rating: 4.8, reviews: 95 }
        },
        {
            id: 9,
            image: 'https://images.unsplash.com/photo-1463453091185-61582044d556?auto=format&fit=crop&w=800&q=80',
            name: 'Dinesh Chandimal',
            location: 'Matara',
            phone: '+94 77 901 2345',
            email: 'dinesh@lkestate.lk',
            details: { listings: 88, sold: 40, experience: 7, rating: 4.7, reviews: 52 }
        },
        {
            id: 10,
            image: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=800&q=80',
            name: 'Ishani Perera',
            location: 'Gampaha',
            phone: '+94 77 012 3456',
            email: 'ishani@lkestate.lk',
            details: { listings: 15, sold: 8, experience: 2, rating: 4.4, reviews: 20 }
        }
    ];

    constructor() { }

    public getAgents(): Observable<Agent[]> {
        return of(this.agents);
    }


}
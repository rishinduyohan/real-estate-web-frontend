import { inject, Injectable } from '@angular/core';
import { User } from '../model/user.model';
import { Observable, of } from 'rxjs';

@Injectable({
    providedIn: 'root',
})
export class UserService {
    private users: User[] = [
        {
            id: 1,
            fullName: 'Rishindu Peeris',
            image: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400',
            email: 'admin@lkestate.lk',
            password: '1234',
            phone: '+94 77 111 2222',
            role: 'admin',
            createdDate: new Date('2026-01-03')
        },
        {
            id: 101,
            fullName: 'LK Holdings Admin',
            image: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?w=400',
            email: 'admin@lkholdings.com',
            password: '1234',
            phone: '+94 11 234 5678',
            role: 'owner',
            createdDate: new Date('2026-02-10')
        },

        {
            id: 301,
            fullName: 'Kumara Silva',
            image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400',
            email: 'kumara@client.com',
            password: '1234',
            phone: '+94 71 555 6666',
            role: 'customer',
            createdDate: new Date('2026-02-12')
        },
        {
            id: 302,
            fullName: 'Sarah Fernando',
            image: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=400',
            email: 'sarah@client.com',
            password: '1234',
            phone: '+94 76 888 9999',
            role: 'customer',
            createdDate: new Date('2026-02-13')
        }
    ];

    public getUsers(): User[] {
        return this.users;
    }

    validateUser(email: string, password: string): Observable<User | undefined> {
        const foundUser = this.users.find(user =>
            user.email === email && user.password === password
        );
        return of(foundUser);
    }

    updateUser(user: User): Observable<User> {
        const index = this.users.findIndex(u => u.id === user.id);
        if (index !== -1) {
            this.users[index] = user;
            return of(user);
        }
        return of(user); // or throw error
    }

}
import { inject, Injectable } from '@angular/core';
import { User } from '../model/user.model';
import { Observable, of } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable({
    providedIn: 'root',
})
export class UserService {


    private apiUrl = 'http://localhost:8080';

    constructor(private http: HttpClient) { }

    getUsers(): Observable<User[]> {
        return this.http.get<User[]>(`${this.apiUrl}/all`);
    }

    addUser(user: User): Observable<User> {
        return this.http.post<User>(`${this.apiUrl}/register`, user);
    }

    updateUser(user: User): Observable<User> {
        return this.http.put<User>(`${this.apiUrl}/update`, user);
    }

    deleteUser(id: number): Observable<void> {
        return this.http.delete<void>(`${this.apiUrl}/delete/${id}`);
    }
    searchUser(id:number):Observable<User>{
        return this.http.get<User>(`${this.apiUrl}/user/${id}`);
    }
}
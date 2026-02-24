import { inject, Injectable, signal } from '@angular/core';
import { Property } from '../model/property.model';
import { Observable, of, tap } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class PropertyService {

  private url = "http://localhost:8080/api/properties"

  properties = signal<any[]>([]);

  constructor(private http: HttpClient) { }

  getProperties(): Observable<any[]> {
    return this.http.get<any[]>(this.url).pipe(
      tap(data => this.properties.set(data))
    );
  }

  getPropertyById(id: number): Observable<Property> {
    return this.http.get<Property>(`${this.url}/${id}`);
  }
  deleteProperty(id: number): Observable<void> {
    return this.http.delete<void>(`${this.url}/${id}`).pipe(
      tap(() => {
        this.properties.set(this.properties().filter(p => p.id !== id));
      })
    );
  }
  updateProperty(property: Property): Observable<Property> {
    return this.http.put<Property>(`${this.url}/${property.id}`, property).pipe(
      tap(updatedProperty => {
        const currentProperties = this.properties();
        const index = currentProperties.findIndex(p => p.id === updatedProperty.id);
        if (index !== -1) {
          const newProperties = [...currentProperties];
          newProperties[index] = updatedProperty;
          this.properties.set(newProperties);
        }
      })
    );
  }

  addProperty(property: Property): Observable<Property> {
    return this.http.post<Property>(`${this.url}/add`, property).pipe(
      tap(newProperty => {
        this.properties.set([...this.properties(), newProperty]);
      })
    );
  }

  private savedProperties: Map<number, number[]> = new Map();

  getSavedProperties(userId: number): Observable<Property[]> {
    const savedIds = this.savedProperties.get(userId) || [];
    const properties = this.properties().filter(p => savedIds.includes(p.id));
    return of(properties);
  }

  isSaved(userId: number, propertyId: number): boolean {
    const savedIds = this.savedProperties.get(userId) || [];
    return savedIds.includes(propertyId);
  }

  toggleSaved(userId: number, propertyId: number): Observable<boolean> {
    let savedIds = this.savedProperties.get(userId) || [];
    const index = savedIds.indexOf(propertyId);

    let isSaved = false;
    if (index === -1) {
      savedIds.push(propertyId);
      isSaved = true;
    } else {
      savedIds.splice(index, 1);
      isSaved = false;
    }

    this.savedProperties.set(userId, savedIds);
    return of(isSaved);
  }
}

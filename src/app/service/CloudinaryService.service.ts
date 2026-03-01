import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { forkJoin, map, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})

export class CloudinaryService {
  private http = inject(HttpClient);
  
  private cloudName = 'dbndqriih'; 
  private uploadPreset = 'estate_preset';
  private uploadUrl = `https://api.cloudinary.com/v1_1/${this.cloudName}/image/upload`;

  uploadImages(files: File[]): Observable<string[]> {
    const uploadRequests = files.map(file => {
      const formData = new FormData();
      formData.append('file', file);
      formData.append('upload_preset', this.uploadPreset);

      return this.http.post<any>(this.uploadUrl, formData).pipe(
        map(res => res.secure_url)
      );
    });

    return forkJoin(uploadRequests); 
  }
}
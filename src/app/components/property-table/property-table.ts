import { Component, OnInit } from '@angular/core';
import { Property } from '../../model/property.model';
import { CommonModule } from '@angular/common';
import { PropertyService } from '../../service/property-service.service';
import { RouterModule } from '@angular/router';
import { map } from 'rxjs';

@Component({
  selector: 'app-property-table',
  imports: [CommonModule,RouterModule],
  templateUrl: './property-table.html',
  styleUrl: './property-table.css',
})
export class PropertyTable implements OnInit{
  allProperties: Property[] = [];

  constructor(private propertyService:PropertyService){}

   ngOnInit(): void {
        this.loadProperties();
    }

    loadProperties(): void {
        this.propertyService.getProperties().pipe(
          map(res=> res.slice(0,6))
        ).subscribe(properties => {
            this.allProperties = properties;
        });
    }

  deleteProperty(id: number): void {
        if (confirm('Are you sure you want to delete this property?')) {
            this.propertyService.deleteProperty(id).subscribe(() => {
                this.loadProperties();
            });
        }
    }

}

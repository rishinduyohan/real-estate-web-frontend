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

  ngOnInit() {
    this.propertyService.getProperties().pipe(
      map(res=> res.slice(0,6))
    ).
    subscribe(props => {
      this.allProperties = props;
    });
  }

}

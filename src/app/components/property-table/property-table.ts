import { Component, OnInit } from '@angular/core';
import { Property } from '../../model/property.model';
import { CommonModule } from '@angular/common';
import { PropertyService } from '../../service/property-service.service';
import { RouterModule } from '@angular/router';

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
    this.propertyService.getProperties().subscribe(props => {
      this.allProperties = props;
    });
  }

}

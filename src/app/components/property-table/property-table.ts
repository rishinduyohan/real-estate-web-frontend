import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';
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
export class PropertyTable {

  @Input() property!: Property;
  @Input() allProperties: Property[] = []; 
  @Output() deleted = new EventEmitter<number>(); 

  deleteProperty(id: number): void {
    if (confirm('Are you sure?')) {
      this.deleted.emit(id);
    }
  }
}

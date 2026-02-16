// property-table.component.ts
import { Component, Input, Output, EventEmitter } from '@angular/core';
import { Property } from '../../model/property.model';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { EditProperty } from '../edit-property/edit-property';

@Component({
  selector: 'app-property-table',
  standalone: true,
  imports: [CommonModule, RouterModule, EditProperty], 
  templateUrl: './property-table.html',
})
export class PropertyTable {
  @Input() allProperties: Property[] = []; 
  @Output() deleted = new EventEmitter<number>(); 
  @Output() refreshRequest = new EventEmitter<void>();

  isEditModalOpen = false; 
  selectedProperty: Property | null = null;

  onEdit(property: Property) {
    console.log('Button clicked! Opening modal for:', property.title);
    this.selectedProperty = { ...property }; 
    this.isEditModalOpen = true; 
  }

  handleSaved() {
    this.isEditModalOpen = false;
    this.refreshRequest.emit();
  }

  handleClosed() {
    this.isEditModalOpen = false;
  }

  deleteProperty(id: number): void {
    if (confirm('Are you sure?')) {
      this.deleted.emit(id);
    }
  }
}
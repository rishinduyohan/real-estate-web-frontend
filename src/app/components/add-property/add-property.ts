import { Component, EventEmitter, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { LucideAngularModule, X, Plus, Trash2 } from 'lucide-angular';
import { Property } from '../../model/property.model';
import { PropertyService } from '../../service/property-service.service';
import { AuthService } from '../../service/auth.service';

@Component({
    selector: 'app-add-property',
    standalone: true,
    imports: [CommonModule, FormsModule, LucideAngularModule],
    templateUrl: './add-property.html',
    styleUrls: []
})
export class AddPropertyComponent {
    @Output() saved = new EventEmitter<void>();
    isAddModalOpen = false;
    property!: Property;

    readonly X = X;
    readonly Plus = Plus;
    readonly Trash2 = Trash2;

    constructor(
        private propertyService: PropertyService,
        private authService: AuthService
    ) { }

    openAddPropertyModal() {
        this.initNewProperty();
        this.isAddModalOpen = true;
    }

    closeAddModal() {
        this.isAddModalOpen = false;
    }

    initNewProperty() {
        this.property = {
            id: 0,
            title: '',
            location: '',
            type: 'House',
            price: 0,
            size: '',
            status: 'Available',
            image: '',
            ownerId: this.authService.getCurrentUserId(),
            details: {
                bedrooms: 0,
                bathrooms: 0,
                description: '',
                images: []
            }
        };
    }

    addImageUrl() {
        this.property.details.images.push('');
    }

    removeImageUrl(index: number) {
        this.property.details.images.splice(index, 1);
    }

    customTrackBy(index: number, obj: any): any {
        return index;
    }

    onSubmit() {
        this.propertyService.addProperty(this.property).subscribe(() => {
            alert('Property added successfully!');
            this.saved.emit();
            this.closeAddModal();
        });
    }
}

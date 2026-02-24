import { Component, EventEmitter, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { LucideAngularModule, X, Plus, Trash2 } from 'lucide-angular';
import { Property } from '../../model/property.model';
import { PropertyService } from '../../service/property-service.service';
import { AuthService } from '../../service/auth.service';
import { CloudinaryService } from '../../service/CloudinaryService.service';

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

    // File upload state array
    selectedFiles: File[] = [];
    imagePreviews: string[] = [];
    isUploading = false;

    readonly X = X;
    readonly Plus = Plus;
    readonly Trash2 = Trash2;

    constructor(
        private propertyService: PropertyService,
        private authService: AuthService,
        private cloudinaryService: CloudinaryService
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
            title: '',
            location: '',
            type: 'HOUSE',
            price: 0,
            size: '',
            status: 'AVAILABLE',
            images: [],
            ownerId: this.authService.getCurrentUserId(),
            details: {
                bedrooms: 0,
                bathrooms: 0,
                description: ''
            }
        };
    }

    onFilesSelected(event: any) {
        const files: FileList = event.target.files;
        if (files && files.length > 0) {
            Array.from(files).forEach(file => {
                this.selectedFiles.push(file);

                // Create preview URL
                const reader = new FileReader();
                reader.onload = (e: any) => {
                    this.imagePreviews.push(e.target.result);
                };
                reader.readAsDataURL(file);
            });
        }
    }

    removeImage(index: number) {
        this.selectedFiles.splice(index, 1);
        this.imagePreviews.splice(index, 1);
    }

    onSubmit() {
        if (this.selectedFiles.length === 0) {
            alert('Please select at least one image for the property.');
            return;
        }

        this.isUploading = true;

        this.cloudinaryService.uploadImages(this.selectedFiles).subscribe({
            next: (urls) => {
                this.property.images = urls;
                this.propertyService.addProperty(this.property).subscribe(() => {
                    alert('Property added successfully!');
                    this.saved.emit();
                    this.isUploading = false;
                    this.closeAddModal();
                });
            },
            error: (err) => {
                console.error("Cloudinary upload failed", err);
                alert('Failed to upload images. Please try again.');
                this.isUploading = false;
            }
        });
    }
}

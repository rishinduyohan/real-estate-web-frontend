import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { LucideAngularModule, Save, X, ArrowLeft, Plus, Trash2 } from 'lucide-angular';
import { PropertyService } from '../../service/property-service.service';
import { Property } from '../../model/property.model';
import { AuthService } from '../../service/auth.service';
import { CloudinaryService } from '../../service/CloudinaryService.service';
import { forkJoin, of } from 'rxjs';

@Component({
    selector: 'app-edit-property',
    standalone: true,
    imports: [CommonModule, FormsModule, RouterModule, LucideAngularModule],
    templateUrl: './edit-property.html',
    styleUrls: []
})
export class EditProperty implements OnInit {
    @Input() property!: Property;
    @Input() isModal: boolean = false;
    @Output() saved = new EventEmitter();
    @Output() closed = new EventEmitter();

    selectedFiles: { file: File, preview: string }[] = [];
    isUploading = false;

    readonly Save = Save;
    readonly X = X;
    readonly ArrowLeft = ArrowLeft;
    readonly Plus = Plus;
    readonly Trash2 = Trash2;

    constructor(
        private route: ActivatedRoute,
        private router: Router,
        private propertyService: PropertyService,
        private authService: AuthService,
        private cloudinaryService: CloudinaryService
    ) { }

    ngOnInit() {
        if (!this.property) {
            this.initNewProperty();
        }

        this.route.paramMap.subscribe(params => {
            const id = params.get('id');
            if (id) {
                this.propertyService.getPropertyById(+id).subscribe(prop => {
                    if (prop) {
                        this.property = { ...prop };
                        if (!this.property.images) {
                            this.property.images = [];
                        }
                    } else {
                        this.router.navigate(['/manage-properties']);
                    }
                });
            }
        });
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
                const reader = new FileReader();
                reader.onload = (e: any) => {
                    this.selectedFiles.push({ file, preview: e.target.result });
                };
                reader.readAsDataURL(file);
            });
        }
    }

    removeExistingImage(index: number) {
        this.property.images.splice(index, 1);
    }

    removeNewFile(index: number) {
        this.selectedFiles.splice(index, 1);
    }

    onSubmit() {
        if (this.property.images.length === 0 && this.selectedFiles.length === 0) {
            alert('Please select at least one image for the property.');
            return;
        }

        this.isUploading = true;

        if (this.selectedFiles.length > 0) {
            const filesToUpload = this.selectedFiles.map(f => f.file);
            this.cloudinaryService.uploadImages(filesToUpload).subscribe({
                next: (urls) => {
                    this.property.images = [...this.property.images, ...urls];
                    this.savePropertyChanges();
                },
                error: (err) => {
                    console.error("Cloudinary upload failed", err);
                    alert('Failed to upload images. Please try again.');
                    this.isUploading = false;
                }
            });
        } else {
            this.savePropertyChanges();
        }
    }

    private savePropertyChanges() {
        this.propertyService.updateProperty(this.property).subscribe(() => {
            alert('Property updated successfully!');
            this.isUploading = false;
            this.selectedFiles = []; 
            this.saved.emit();
        });
    }

    cancel(): void {
        this.closed.emit();
    }
}

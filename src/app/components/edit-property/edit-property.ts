import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { LucideAngularModule, Save, X, ArrowLeft, Plus, Trash2 } from 'lucide-angular';
import { PropertyService } from '../../service/property-service.service';
import { Property } from '../../model/property.model';
import { AuthService } from '../../service/auth.service';

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

    readonly Save = Save;
    readonly X = X;
    readonly ArrowLeft = ArrowLeft;
    readonly Plus = Plus;
    readonly Trash2 = Trash2;

    constructor(
        private route: ActivatedRoute,
        private router: Router,
        private propertyService: PropertyService,
        private authService: AuthService
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
                        if (!this.property.images || this.property.images.length === 0) {
                            this.property.images = [''];
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
            images: [''],
            ownerId: this.authService.getCurrentUserId(),
            details: {
                bedrooms: 0,
                bathrooms: 0,
                description: ''
            }
        };
    }

    addImageUrl() {
        this.property.images.push('');
    }

    removeImageUrl(index: number) {
        this.property.images.splice(index + 1, 1);
    }

    customTrackBy(index: number, obj: any): any {
        return index;
    }

    onSubmit() {
        if (this.property.id === 0) {
            this.propertyService.addProperty(this.property).subscribe(() => {
                alert('Property added successfully!');
                this.saved.emit();
            });
        } else {
            this.propertyService.updateProperty(this.property).subscribe(() => {
                alert('Property updated successfully!');
                this.saved.emit();
            });
        }
    }

    cancel(): void {
        this.closed.emit();
    }
}

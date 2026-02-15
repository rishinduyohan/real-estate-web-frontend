import { Component, Input, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { LucideAngularModule, Save, X, ArrowLeft } from 'lucide-angular';
import { PropertyService } from '../../service/property-service.service';
import { Property } from '../../model/property.model';

@Component({
    selector: 'app-edit-property',
    standalone: true,
    imports: [CommonModule, FormsModule, RouterModule, LucideAngularModule],
    templateUrl: './edit-property.html',
    styleUrls: []
})
export class EditProperty implements OnInit {
    @Input() property!: Property;

    readonly Save = Save;
    readonly X = X;
    readonly ArrowLeft = ArrowLeft;

    constructor(
        private route: ActivatedRoute,
        private router: Router,
        private propertyService: PropertyService
    ) { }

    ngOnInit(): void {
        this.route.paramMap.subscribe(params => {
            const id = params.get('id');
            if (id) {
                this.propertyService.getPropertyById(+id).subscribe(prop => {
                    if (prop) {
                        this.property = { ...prop };
                    } else {
                        this.router.navigate(['/manage-properties']);
                    }
                });
            }
        });
    }

    onSubmit(): void {
        if (this.property) {
            this.propertyService.updateProperty(this.property).subscribe(() => {
                alert('Property updated successfully!');
                this.router.navigate(['/manage-properties']);
            });
        }
    }

    cancel(): void {
        this.router.navigate(['/manage-properties']);
    }
}

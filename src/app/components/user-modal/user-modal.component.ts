import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { LucideAngularModule, X, Camera } from 'lucide-angular';

@Component({
    selector: 'app-user-modal',
    standalone: true,
    imports: [CommonModule, FormsModule, LucideAngularModule],
    templateUrl: './user-modal.component.html'
})
export class UserModalComponent {
    @Input() isOpen = false;
    @Input() activeTab: 'OWNERS' | 'CUSTOMERS' = 'OWNERS';
    @Input() editingUser: any = null;
    @Input() formData: any = {};
    @Input() isUploading = false;

    @Output() closeModal = new EventEmitter<void>();
    @Output() saveUser = new EventEmitter<{ formData: any, file: File | null }>();

    selectedFile: File | null = null;

    readonly X = X;
    readonly Camera = Camera;

    onFileSelected(event: any) {
        const file = event.target.files[0];
        if (file) {
            this.selectedFile = file;
            const reader = new FileReader();
            reader.onload = (e: any) => {
                this.formData.imageUrl = e.target.result;
            };
            reader.readAsDataURL(file);
        }
    }

    handleSave() {
        this.saveUser.emit({ formData: this.formData, file: this.selectedFile });
        this.selectedFile = null;
    }

    handleClose() {
        this.selectedFile = null;
        this.closeModal.emit();
    }
}

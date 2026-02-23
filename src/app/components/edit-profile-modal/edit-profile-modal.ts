import { Component, EventEmitter, Input, Output, OnChanges, SimpleChanges } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { LucideAngularModule, X, Camera } from 'lucide-angular';
import { User } from '../../model/user.model';
import { UserService } from '../../service/user.service';

@Component({
    selector: 'app-edit-profile-modal',
    standalone: true,
    imports: [CommonModule, FormsModule, LucideAngularModule],
    templateUrl: './edit-profile-modal.html',
})
export class EditProfileModalComponent implements OnChanges {
    @Input() isOpen = false;
    @Input() user: User | undefined;
    @Output() close = new EventEmitter<void>();
    @Output() userUpdated = new EventEmitter<void>();

    readonly X = X;
    readonly Camera = Camera;

    editData: any = {};
    isLoading = false;
    defaultLocation = 'Colombo, Sri Lanka';

    constructor(private userService: UserService) { }

    ngOnChanges(changes: SimpleChanges) {
        if (changes['isOpen'] && changes['isOpen'].currentValue === true) {
            this.initForm();
        }
    }

    initForm() {
        if (this.user) {
            this.editData = {
                ...this.user,
                location: (this.user as any).location || this.defaultLocation
            };
        }
    }

    onFileSelected(event: any) {
        const file = event.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = (e: any) => {
                this.editData.imageUrl = e.target.result;
            };
            reader.readAsDataURL(file);
        }
    }

    closeModal() {
        this.close.emit();
    }

    saveSettings() {
        if (!this.user) return;

        this.isLoading = true;

        const updatedUser = { ...this.user };
        updatedUser.username = this.editData.username;
        updatedUser.email = this.editData.email;
        updatedUser.phone = this.editData.phone;
        updatedUser.imageUrl = this.editData.imageUrl;

        this.userService.updateUser(updatedUser).subscribe({
            next: () => {
                this.isLoading = false;
                this.userUpdated.emit();
                this.closeModal();
            },
            error: (err) => {
                console.error('Failed to update profile', err);
                this.isLoading = false;
            }
        });
    }
}

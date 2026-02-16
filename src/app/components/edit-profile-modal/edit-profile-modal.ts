import { Component, EventEmitter, Input, Output, OnChanges, SimpleChanges } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { LucideAngularModule, X } from 'lucide-angular';
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

    editData: any = {};
    isLoading = false;
    // Hardcoded default location since it's not in the User model yet
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

    closeModal() {
        this.close.emit();
    }

    saveSettings() {
        if (!this.user) return;

        this.isLoading = true;

        // Update local user object (mock update)
        const updatedUser = { ...this.user };
        updatedUser.fullName = this.editData.fullName;
        updatedUser.email = this.editData.email;
        updatedUser.phone = this.editData.phone;
        // We can't save location to the User model yet as it doesn't exist, 
        // but we can simulate it or pass it back if needed.
        // For now, we just update the standard fields.

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

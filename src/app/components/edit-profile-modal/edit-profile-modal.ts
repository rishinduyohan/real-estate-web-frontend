import { Component, EventEmitter, Input, Output, OnChanges, SimpleChanges, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { LucideAngularModule, X, Camera } from 'lucide-angular';
import { User } from '../../model/user.model';
import { UserService } from '../../service/user.service';
import { CloudinaryService } from '../../service/CloudinaryService.service';

@Component({
    selector: 'app-edit-profile-modal',
    standalone: true,
    imports: [CommonModule, FormsModule, LucideAngularModule],
    templateUrl: './edit-profile-modal.html',
})
export class EditProfileModalComponent implements OnChanges, OnInit {
    @Input() isOpen = false;
    @Input() user: User | any;
    @Output() close = new EventEmitter<void>();
    @Output() userUpdated = new EventEmitter<void>();

    readonly X = X;
    readonly Camera = Camera;

    editData: any = {};
    isLoading = false;
    defaultLocation = 'Colombo, Sri Lanka';
    selectedFile: File | null = null; // Track raw file for Cloudinary

    constructor(private userService: UserService, private cloudinaryService: CloudinaryService) { }

    ngOnChanges(changes: SimpleChanges) {
        if (changes['user'] && this.user) {
            this.initForm();
        }
        if (changes['isOpen'] && this.isOpen) {
            this.initForm();
        }
    }

    ngOnInit(): void {
        this.initForm();
    }

    initForm() {
        if (this.user) {
            this.editData = {
                ...this.user,
                location: (this.user as any).location || this.defaultLocation
            };
            this.selectedFile = null; 
        }
    }

    onFileSelected(event: any) {
        const file = event.target.files[0];
        if (file) {
            this.selectedFile = file;
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

        if (this.selectedFile) {
            this.cloudinaryService.uploadImages([this.selectedFile]).subscribe({
                next: (urls) => {
                    updatedUser.imageUrl = urls[0];
                    this.sendUserUpdate(updatedUser);
                },
                error: (err) => {
                    console.error('Failed to upload profile picture', err);
                    alert('Image upload failed. Please try again.');
                    this.isLoading = false;
                }
            });
        } else {
            updatedUser.imageUrl = this.editData.imageUrl;
            this.sendUserUpdate(updatedUser);
        }
    }

    private sendUserUpdate(userPayload: User) {
        this.userService.updateUser(userPayload).subscribe({
            next: () => {
                this.isLoading = false;
                this.selectedFile = null;
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

import { Component, EventEmitter, Input, Output, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Router } from '@angular/router';
import { LucideAngularModule, User, Settings, Shield, Bell, HelpCircle, LogOut } from 'lucide-angular';
import { AuthService } from '../../service/auth.service';
import { UserService } from '../../service/user.service';
import { User as UserModel } from '../../model/user.model';
import { EditProfileModalComponent } from '../edit-profile-modal/edit-profile-modal';

@Component({
    selector: 'app-user-profile',
    standalone: true,
    imports: [CommonModule, RouterModule, LucideAngularModule, EditProfileModalComponent],
    templateUrl: './user-profile.html',
})
export class UserProfileComponent implements OnInit {
    @Input() userRole: string = '';
    @Output() logout = new EventEmitter<void>();

    isOpen = false;
    isEditModalOpen = false;
    currentUser: UserModel | undefined;

    readonly User = User;
    readonly Settings = Settings;
    readonly Shield = Shield;
    readonly Bell = Bell;
    readonly HelpCircle = HelpCircle;
    readonly LogOut = LogOut;

    constructor(
        private router: Router,
        private authService: AuthService,
        private userService: UserService
    ) { }

    ngOnInit() {
        this.loadUser();
    }

    loadUser() {
        const userId = this.authService.getCurrentUserId();
        if (userId) {
            this.userService.searchUser(userId).subscribe({
                next: (user) => {
                    this.currentUser = user;
                },
                error: (err) => {
                    console.error('Failed to load user profile in navbar', err);
                }
            });
        }
    }

    toggleMenu() {
        this.isOpen = !this.isOpen;
    }

    closeMenu() {
        this.isOpen = false;
    }

    onLogout() {
        this.logout.emit();
        this.closeMenu();
    }

    navigateTo(path: string) {
        this.router.navigate([path]);
        this.closeMenu();
    }

    openSettings() {
        this.isEditModalOpen = true;
        this.closeMenu();
    }

    closeEditModal() {
        this.isEditModalOpen = false;
    }

    onUserUpdated() {
        this.loadUser();
    }

    openPrivacy() {
        alert('Privacy Policy clicked');
        this.closeMenu();
    }

    openNotifications() {
        this.router.navigate(['/inquiries']);
        this.closeMenu();
    }

    openHelp() {
        alert('Help & Support clicked');
        this.closeMenu();
    }
}

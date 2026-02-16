import { Component, EventEmitter, Input, Output } from '@angular/core';
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
export class UserProfileComponent {
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
        const userId = this.authService.getCurrentUserId();
        this.currentUser = this.userService.getUsers().find(u => u.id === userId);

        this.isEditModalOpen = true;
        this.closeMenu();
    }

    closeEditModal() {
        this.isEditModalOpen = false;
    }

    onUserUpdated() {
        // Refresh user data if needed, or just close
        const userId = this.authService.getCurrentUserId();
        this.currentUser = this.userService.getUsers().find(u => u.id === userId);
    }

    openPrivacy() {
        alert('Privacy Policy clicked');
        this.closeMenu();
    }

    openNotifications() {
        alert('Notifications clicked');
        this.closeMenu();
    }

    openHelp() {
        alert('Help & Support clicked');
        this.closeMenu();
    }
}

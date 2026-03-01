import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { NavbarComponent } from '../../components/navbar/navbar.component';
import { AuthService } from '../../service/auth.service';
import { UserService } from '../../service/user.service';
import { User } from '../../model/user.model';
import { Router, RouterModule } from '@angular/router';
import { LucideAngularModule, User as UserIcon, Mail, Phone, MapPin, ChevronRight, Settings, Bell, Shield, HelpCircle, LogOut, X } from 'lucide-angular';
import { EditProfileModalComponent } from '../../components/edit-profile-modal/edit-profile-modal';

@Component({
    selector: 'app-my-profile',
    standalone: true,
    imports: [CommonModule, FormsModule, NavbarComponent, LucideAngularModule, EditProfileModalComponent,RouterModule],
    templateUrl: './my-profile.html',
})
export class MyProfileComponent implements OnInit {
    user!: User | any;
    userLocation = 'Colombo, Sri Lanka';

    readonly UserIcon = UserIcon;
    readonly Mail = Mail;
    readonly Phone = Phone;
    readonly MapPin = MapPin;
    readonly ChevronRight = ChevronRight;
    readonly Settings = Settings;
    readonly Bell = Bell;
    readonly Shield = Shield;
    readonly HelpCircle = HelpCircle;
    readonly LogOut = LogOut;
    readonly X = X;

    menuItems = [
        { icon: Settings, label: 'Account Settings', action: () => this.openSettings() },
        { icon: Bell, label: 'Notifications', action: () => this.openNotifications() },
        { icon: Shield, label: 'Privacy & Security', action: () => this.openPrivacy() },
        { icon: HelpCircle, label: 'Help & Support', action: () => this.openHelp() },
    ];

    isEditModalOpen = false;

    constructor(
        private authService: AuthService,
        private userService: UserService,
        private router: Router
    ) { }

    ngOnInit() {
        this.loadUser();
    }

    loadUser() {
        const userId = this.authService.getCurrentUserId();
        this.userService.searchUser(userId).subscribe(res=>{
            this.user = res;
        });
    }

    onLogout() {
        this.authService.logout();
        this.router.navigate(['/']);
    }

    openSettings() {
        this.isEditModalOpen = true;
    }

    closeSettings() {
        this.isEditModalOpen = false;
    }

    onUserUpdated() {
        this.loadUser();
    }

    openNotifications() {
        this.router.navigate(['/inquiries']);
    }

    openPrivacy() {
        console.log('Privacy clicked');
    }

    openHelp() {
        console.log('Help clicked');
    }
}

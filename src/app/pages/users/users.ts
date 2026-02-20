import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { NavbarComponent } from '../../components/navbar/navbar.component';
import { FooterComponent } from '../../components/footer/footer.component';
import { OwnerService } from '../../service/owner.service';
import { Owner } from '../../model/owner.model';
import { UserService } from '../../service/user.service';
import { User } from '../../model/user.model';
import { LucideAngularModule, Search, Plus, Trash2, Edit, Mail, Trophy, MapPin, Star, Home, X, Camera } from 'lucide-angular';

@Component({
    selector: 'app-users',
    standalone: true,
    imports: [CommonModule, FormsModule, NavbarComponent, FooterComponent, LucideAngularModule],
    templateUrl: './users.html',
})
export class UserManagementPage implements OnInit {
    activeTab: 'owners' | 'customers' = 'owners';

    owners: Owner[] = [];
    customers: User[] = [];
    filteredUsers: any[] = [];

    searchQuery: string = '';
    bestUser: any = null;

    isModalOpen = false;
    editingUser: any = null;
    formData: any = {};

    readonly Search = Search;
    readonly Plus = Plus;
    readonly Trash2 = Trash2;
    readonly Edit = Edit;
    readonly Mail = Mail;
    readonly Trophy = Trophy;
    readonly MapPin = MapPin;
    readonly Star = Star;
    readonly Home = Home;
    readonly X = X;
    readonly Camera = Camera;

    constructor(
        private ownerService: OwnerService,
        private userService: UserService
    ) { }

    ngOnInit() {
        this.loadData();
    }

    loadData() {
        this.ownerService.getOwners().subscribe(data => {
            this.owners = data;
            this.filterUsers();
        });

        const allUsers = this.userService.getUsers();
        this.customers = allUsers.filter(u => u.role === 'customer');
        this.filterUsers();
    }

    get currentData() {
        return this.activeTab === 'owners' ? this.owners : this.customers;
    }

    filterUsers() {
        const data = this.currentData;

        if (this.activeTab === 'owners') {
            this.findBestUser(this.owners);
        } else {
            this.bestUser = null; // No "best user" logic currently for customers
        }

        if (!this.searchQuery) {
            this.filteredUsers = data;
        } else {
            const query = this.searchQuery.toLowerCase();
            this.filteredUsers = data.filter((u: any) =>
                (u.name && u.name.toLowerCase().includes(query)) ||
                (u.fullName && u.fullName.toLowerCase().includes(query)) ||
                u.email.toLowerCase().includes(query) ||
                (u.location && u.location.toLowerCase().includes(query))
            );
        }
    }

    switchTab(tab: 'owners' | 'customers') {
        this.activeTab = tab;
        this.searchQuery = '';
        this.filterUsers();
    }

    findBestUser(users: Owner[]) {
        if (!users || !users.length) {
            this.bestUser = null;
            return;
        }

        this.bestUser = users.reduce((prev, current) => {
            const prevProps = prev.properties?.length || 0;
            const currProps = current.properties?.length || 0;
            return (prevProps > currProps) ? prev : current;
        });
    }

    contactUser(user: any) {
        window.location.href = `mailto:${user.email}`;
    }

    deleteUser(id: number) {
        if (confirm('Are you sure you want to delete this user?')) {
            if (this.activeTab === 'owners') {
                this.ownerService.deleteOwner(id).subscribe(() => this.loadData());
            } else {
                this.userService.deleteUser(id).subscribe(() => this.loadData());
            }
        }
    }

    openModal(user: any = null) {
        this.editingUser = user;
        if (user) {
            this.formData = { ...user };
        } else {
            let baseId = Date.now();
            let baseImg = 'https://images.unsplash.com/photo-1511367461989-f85a21fda167?w=400';

            if (this.activeTab === 'owners') {
                this.formData = { id: baseId, name: '', email: '', phone: '', location: '', image: baseImg, properties: [] };
            } else {
                this.formData = { id: baseId, fullName: '', email: '', phone: '', role: 'customer', image: baseImg, password: 'password123', createdDate: new Date() };
            }
        }
        this.isModalOpen = true;
    }

    onFileSelected(event: any) {
        const file = event.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = (e: any) => {
                this.formData.image = e.target.result;
            };
            reader.readAsDataURL(file);
        }
    }

    closeModal() {
        this.isModalOpen = false;
        this.editingUser = null;
        this.formData = {};
    }

    saveUser() {
        const user = this.formData;

        if (this.activeTab === 'owners') {
            if (!user.properties) user.properties = [];

            if (this.editingUser) {
                this.ownerService.updateOwner(user).subscribe(() => { this.closeAndRefresh(); });
            } else {
                this.ownerService.addOwner(user).subscribe(() => { this.closeAndRefresh(); });
            }
        } else {
            if (this.editingUser) {
                this.userService.updateUser(user).subscribe(() => { this.closeAndRefresh(); });
            } else {
                this.userService.addUser(user).subscribe(() => { this.closeAndRefresh(); });
            }
        }
    }

    closeAndRefresh() {
        this.closeModal();
        this.loadData();
        alert(`${this.activeTab === 'owners' ? 'Owner' : 'Customer'} saved successfully!`);
    }
}

import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { NavbarComponent } from '../../components/navbar/navbar.component';
import { FooterComponent } from '../../components/footer/footer.component';
import { OwnerService } from '../../service/owner.service';
import { Owner } from '../../model/owner.model';
import { LucideAngularModule, Search, Plus, Trash2, Edit, Mail, Trophy, MapPin, Star, Home, X } from 'lucide-angular';

@Component({
    selector: 'app-users',
    standalone: true,
    imports: [CommonModule, FormsModule, NavbarComponent, FooterComponent, LucideAngularModule],
    templateUrl: './users.html',
})
export class UserManagementPage implements OnInit {
    activeTab: 'owners' = 'owners';

    owners: Owner[] = [];
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

    constructor(
        private ownerService: OwnerService
    ) { }

    ngOnInit() {
        this.loadData();
    }

    loadData() {
        this.ownerService.getOwners().subscribe(data => {
            this.owners = data;
            this.filterUsers();
        });
    }

    get currentData() {
        return this.owners;
    }

    filterUsers() {
        const data = this.currentData;
        this.findBestUser(data);

        if (!this.searchQuery) {
            this.filteredUsers = data;
        } else {
            const query = this.searchQuery.toLowerCase();
            this.filteredUsers = data.filter(u =>
                u.name.toLowerCase().includes(query) ||
                u.email.toLowerCase().includes(query) ||
                u.location.toLowerCase().includes(query)
            );
        }
    }

    switchTab(tab: 'owners') {
        this.activeTab = tab;
        this.filterUsers();
    }

    findBestUser(users: any[]) {
        if (!users.length) {
            this.bestUser = null;
            return;
        }

        // Logic: Owners -> Most Properties.
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
            this.ownerService.deleteOwner(id).subscribe(() => this.loadData());
        }
    }

    openModal(user: any = null) {
        this.editingUser = user;
        if (user) {
            this.formData = { ...user };
        } else {
            this.formData = { id: Date.now(), name: '', email: '', phone: '', location: '', image: 'https://images.unsplash.com/photo-1511367461989-f85a21fda167?w=400', properties: [] };
        }
        this.isModalOpen = true;
    }

    closeModal() {
        this.isModalOpen = false;
        this.editingUser = null;
        this.formData = {};
    }

    saveUser() {
        const user = this.formData;

        // Quick validation fix for "properties" on new owners
        if (!user.properties) {
            user.properties = [];
        }

        if (this.editingUser) {
            // Update
            this.ownerService.updateOwner(user).subscribe(() => { this.closeAndRefresh(); });
        } else {
            // Add
            this.ownerService.addOwner(user).subscribe(() => { this.closeAndRefresh(); });
        }
    }

    closeAndRefresh() {
        this.closeModal();
        this.loadData();
        alert('User saved successfully!');
    }
}

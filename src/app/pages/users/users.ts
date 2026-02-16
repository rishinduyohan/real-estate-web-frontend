import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { NavbarComponent } from '../../components/navbar/navbar.component';
import { AgentService } from '../../service/agent.service';
import { OwnerService } from '../../service/owner.service';
import { Agent } from '../../model/agent.model';
import { Owner } from '../../model/owner.model';
import { LucideAngularModule, Search, Plus, Trash2, Edit, Mail, Trophy, MapPin, Star, Home, X } from 'lucide-angular';

@Component({
    selector: 'app-users',
    standalone: true,
    imports: [CommonModule, FormsModule, NavbarComponent, LucideAngularModule],
    templateUrl: './users.html',
})
export class UserManagementPage implements OnInit {
    activeTab: 'agents' | 'owners' = 'agents';

    agents: Agent[] = [];
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
        private agentService: AgentService,
        private ownerService: OwnerService
    ) { }

    ngOnInit() {
        this.loadData();
    }

    loadData() {
        this.agentService.getAgents().subscribe(data => {
            this.agents = data;
            if (this.activeTab === 'agents') this.filterUsers();
        });

        this.ownerService.getOwners().subscribe(data => {
            this.owners = data;
            if (this.activeTab === 'owners') this.filterUsers();
        });
    }

    get currentData() {
        return this.activeTab === 'agents' ? this.agents : this.owners;
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

    // Switch tabs and re-filter
    ngDoCheck() {
        // Simple check to toggle view data when tab changes logic is handled in filterUsers if called
        // efficient way is to bind click to a method that sets tab AND calls filter
    }

    // Use setter or method in template for tab switching to ensure filter runs
    // Note: Since I used simple variable binding in template, I'll update the template to call a method or watch the var. Add a method:

    // Re-implement tab switching if I can't edit template easily, but better to just trigger filter on click.
    // Actually, I'll rely on the template button (click)="activeTab='agents'; filterUsers()" but standard approach:

    // Updated solution:
    // I will use a getter/setter or just call filterUsers() manually when tab changes in the template? 
    // Let's modify the template to call `switchTab` instead of direct assignment, or use ngOnChanges if applicable (not for internal props).
    // I'll make sure to call filterUsers() whenever data or tab changes. To be safe, I'm calling it in load and input change.
    // Let's add explicit method for tab switching.

    switchTab(tab: 'agents' | 'owners') {
        this.activeTab = tab;
        this.filterUsers();
    }

    findBestUser(users: any[]) {
        if (!users.length) {
            this.bestUser = null;
            return;
        }

        // Logic: Agents -> Highest Rating, then Listings. Owners -> Most Properties.
        this.bestUser = users.reduce((prev, current) => {
            if (this.activeTab === 'agents') {
                const prevRating = prev.details?.rating || 0;
                const currRating = current.details?.rating || 0;
                return (prevRating > currRating) ? prev : current;
            } else {
                const prevProps = prev.properties?.length || 0;
                const currProps = current.properties?.length || 0;
                return (prevProps > currProps) ? prev : current;
            }
        });
    }

    contactUser(user: any) {
        window.location.href = `mailto:${user.email}`;
    }

    deleteUser(id: number) {
        if (confirm('Are you sure you want to delete this user?')) {
            if (this.activeTab === 'agents') {
                this.agentService.deleteAgent(id).subscribe(() => this.loadData());
            } else {
                this.ownerService.deleteOwner(id).subscribe(() => this.loadData());
            }
        }
    }

    openModal(user: any = null) {
        this.editingUser = user;
        if (user) {
            this.formData = { ...user };
        } else {
            this.formData = { id: Date.now(), name: '', email: '', phone: '', location: '', image: 'https://images.unsplash.com/photo-1511367461989-f85a21fda167?w=400', details: { listings: 0, rating: 5.0 }, properties: [] };
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

        // Quick validation fix for "details" on new agents
        if (this.activeTab === 'agents' && !user.details) {
            user.details = { listings: 0, sold: 0, experience: 0, rating: 5.0, reviews: 0 };
        }

        // Quick validation fix for "properties" on new owners
        if (this.activeTab === 'owners' && !user.properties) {
            user.properties = [];
        }

        if (this.editingUser) {
            // Update
            if (this.activeTab === 'agents') {
                this.agentService.updateAgent(user).subscribe(() => { this.closeAndRefresh(); });
            } else {
                this.ownerService.updateOwner(user).subscribe(() => { this.closeAndRefresh(); });
            }
        } else {
            // Add
            if (this.activeTab === 'agents') {
                this.agentService.addAgent(user).subscribe(() => { this.closeAndRefresh(); });
            } else {
                this.ownerService.addOwner(user).subscribe(() => { this.closeAndRefresh(); });
            }
        }
    }

    closeAndRefresh() {
        this.closeModal();
        this.loadData();
        alert('User saved successfully!');
    }
}

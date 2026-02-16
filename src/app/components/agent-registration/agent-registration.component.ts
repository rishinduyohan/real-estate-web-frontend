import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { NavbarComponent } from '../../components/navbar/navbar.component';
import { AuthService } from '../../service/auth.service';
import { AgentService, AgentRequest } from '../../service/agent.service';
import { UserService } from '../../service/user.service';
import { User } from '../../model/user.model';
import { Router } from '@angular/router';
import { LucideAngularModule, Building2, User as UserIcon, CheckCircle } from 'lucide-angular';

@Component({
    selector: 'app-agent-registration',
    standalone: true,
    imports: [CommonModule, FormsModule, NavbarComponent, LucideAngularModule],
    templateUrl: './agent-registration.component.html',
})
export class AgentRegistrationComponent implements OnInit {
    owners: User[] = [];
    selectedOwnerId: number | null = null;
    isSubmitting = false;
    successMessage = '';

    readonly Building2 = Building2;
    readonly UserIcon = UserIcon;
    readonly CheckCircle = CheckCircle;

    constructor(
        private authService: AuthService,
        private agentService: AgentService,
        private userService: UserService,
        private router: Router
    ) { }

    ngOnInit() {
        this.loadOwners();
    }

    loadOwners() {
        // We need to simulate getting only owners. 
        // In a real API we would have a specific endpoint. 
        // Here we filter users by role 'owner'.
        const allUsers = this.userService.getUsers();
        this.owners = allUsers.filter(u => u.role === 'owner');
    }

    submitRequest() {
        if (!this.selectedOwnerId) return;

        this.isSubmitting = true;
        const currentUserId = this.authService.getCurrentUserId();
        const currentUser = this.userService.getUsers().find(u => u.id === currentUserId);

        if (!currentUser) {
            this.isSubmitting = false;
            return;
        }

        const request: AgentRequest = {
            id: 0, // Assigned by service
            userId: currentUser.id,
            userName: currentUser.fullName,
            userEmail: currentUser.email,
            ownerId: +this.selectedOwnerId,
            status: 'pending',
            date: new Date()
        };

        this.agentService.createRequest(request).subscribe(() => {
            this.isSubmitting = false;
            this.successMessage = 'Your request has been sent successfully! The owner will review it shortly.';
            setTimeout(() => {
                this.router.navigate(['/agents']);
            }, 3000);
        });
    }
}

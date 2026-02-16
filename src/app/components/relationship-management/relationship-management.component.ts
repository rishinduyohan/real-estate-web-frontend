import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { NavbarComponent } from '../../components/navbar/navbar.component';
import { AuthService } from '../../service/auth.service';
import { AgentService } from '../../service/agent.service';
import { Agent } from '../../model/agent.model';
import { Owner } from '../../model/owner.model';
import { LucideAngularModule, Mail, Phone, MapPin, Trash2, Send, X, User } from 'lucide-angular';

@Component({
    selector: 'app-relationship-management',
    standalone: true,
    imports: [CommonModule, FormsModule, NavbarComponent, LucideAngularModule],
    templateUrl: './relationship-management.component.html',
})
export class RelationshipManagementComponent implements OnInit {
    userRole: string = '';
    agents: Agent[] = [];
    owner: Owner | undefined;

    // Contact Modal
    isContactModalOpen = false;
    contactMessage = '';
    contactTargetName = '';

    readonly Mail = Mail;
    readonly Phone = Phone;
    readonly MapPin = MapPin;
    readonly Trash2 = Trash2;
    readonly Send = Send;
    readonly X = X;
    readonly User = User;

    constructor(
        private authService: AuthService,
        private agentService: AgentService
    ) { }

    ngOnInit() {
        this.userRole = this.authService.getCurrentRole();
        if (this.userRole === 'owner') {
            this.loadAgents();
        } else if (this.userRole === 'agent') {
            this.loadOwner();
        }
    }

    loadAgents() {
        const userId = this.authService.getCurrentUserId();
        this.agentService.getAgentsByOwnerId(userId).subscribe(agents => {
            this.agents = agents;
        });
    }

    loadOwner() {
        // In a real app, we might get the agent's ID from auth, 
        // but here we might need to find the agent by email since auth user ID might not match agent ID directly 
        // or we assume they are mapped. 
        // Let's assume authService can give us the email or name to find the agent record.
        // For this mock, let's use a workaround if needed, but ideally:

        // We don't have getAgentById in functionality yet linked to Auth ID easily 
        // unless we assume Auth ID == Agent ID. 
        // Let's try to find the agent by the logged in user's email which is more reliable locally.

        // We need to fetch the current user's email. AuthService doesn't expose it directly in the public API 
        // but let's assume valid mapping. 
        // Actually, let's just fetch all agents and find the one that matches our "current user".

        // Wait, I added getAgentByEmail to AgentService. I need to get email from AuthService.
        // AuthService doesn't expose email publicly.
        // Let's modify AuthService to expose email or just iterate users to find match.
        // Or efficiently: just assume for this demo we can find by ID if we mapped them right.

        // Let's accept that I might need to update AuthService or just find the user in UserService?
        // Let's try to get it by ID first assuming ID consistency.
        // Actually, looking at UserService, User ID 201 is "Nimal Perera". Agent ID 1 is "Nimal Perera". IDs don't match.
        // User Email "nimal@lkestate.lk" matches Agent Email.
        // So I need the email.

        // I will use a temporary workaround: Find the user in `UserService` (I don't have access here easily without injection)
        // or better: Update `AuthService` to expose `currentUserEmail`.

        // For now, I'll assume I can find the agent by the user's name which I have.
        // this.authService.userName$

        // Let's try to find by Name as a fallback.
        // Actually, I can just subscribe to `authService.userName$` and find the agent by name.

        this.authService.userName$.subscribe(name => {
            this.agentService.getAgents().subscribe(allAgents => {
                const myAgentProfile = allAgents.find(a => a.name === name);
                if (myAgentProfile) {
                    this.owner = myAgentProfile.owner;
                }
            });
        });
    }

    openContactModal(name: string) {
        this.contactTargetName = name;
        this.contactMessage = '';
        this.isContactModalOpen = true;
    }

    closeContactModal() {
        this.isContactModalOpen = false;
    }

    sendMessage() {
        if (!this.contactMessage.trim()) return;

        // Simulate sending
        alert(`Message sent to ${this.contactTargetName}!`);
        this.closeContactModal();
    }

    removeAgent(agentId: number) {
        if (confirm('Are you sure you want to remove this agent?')) {
            this.agentService.deleteAgent(agentId).subscribe(() => {
                this.loadAgents(); // Refresh list
            });
        }
    }
}

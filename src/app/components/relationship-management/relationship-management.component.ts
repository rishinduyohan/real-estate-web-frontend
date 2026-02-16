import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { NavbarComponent } from '../../components/navbar/navbar.component';
import { AuthService } from '../../service/auth.service';
import { AgentService } from '../../service/agent.service';
import { Agent } from '../../model/agent.model';
import { Owner } from '../../model/owner.model';
import { LucideAngularModule, Mail, Phone, MapPin, Trash2, Send, X, User, CheckCircle } from 'lucide-angular';

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
    pendingRequests: any[] = [];

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
    readonly CheckCircle = CheckCircle;

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

        this.agentService.getRequestsByOwner(userId).subscribe(requests => {
            this.pendingRequests = requests;
        });
    }

    loadOwner() {
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
        alert(`Message sent to ${this.contactTargetName}!`);
        this.closeContactModal();
    }

    removeAgent(agentId: number) {
        if (confirm('Are you sure you want to remove this agent?')) {
            this.agentService.deleteAgent(agentId).subscribe(() => {
                this.loadAgents();
            });
        }
    }

    approveRequest(requestId: number) {
        this.agentService.approveRequest(requestId).subscribe(() => {
            this.loadAgents();
            alert('Agent approved successfully!');
        });
    }

    rejectRequest(requestId: number) {
        if (confirm('Are you sure you want to reject this request?')) {
            this.agentService.rejectRequest(requestId).subscribe(() => {
                this.loadAgents();
            });
        }
    }
}

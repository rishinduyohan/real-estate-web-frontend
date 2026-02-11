import { Component, Input, OnInit, Output } from '@angular/core';
import { NavbarComponent } from '../../components/navbar/navbar.component';
import { FooterComponent } from '../../components/footer/footer.component';
import { LucideAngularModule, MapPin, Star, Phone, Mail, Building2, ArrowRight } from 'lucide-angular';
import { Agent } from '../../model/agent.model';
import { AgentService } from '../../service/agent.service';
import { map } from 'rxjs';
import { AgentCard } from '../../components/agent-card/agent-card';
import { CommonModule } from '@angular/common';


@Component({
  selector: 'app-agents',
  imports: [NavbarComponent,FooterComponent, LucideAngularModule, AgentCard, CommonModule],
  templateUrl: './agents.html',
  styleUrl: './agents.css',
})
export class Agents implements OnInit {
  readonly MapPin = MapPin;
  readonly Star = Star;
  readonly Phone = Phone;
  readonly Mail = Mail;
  readonly Building2 = Building2;
  readonly ArrowRight = ArrowRight;

  protected agents : Agent[] = [];

  constructor(
    private agentService : AgentService
  ){}


  ngOnInit() {
    this.agentService.getAgents().pipe(
          map(res => res.slice(0, 8))
        ).subscribe(
          response => {
            console.log(response);
            this.agents = response
          }
        );
  }

  seeMoreClick(){
    this.agentService.getAgents().subscribe(res => {
      this.agents = res;
    });
  }

}

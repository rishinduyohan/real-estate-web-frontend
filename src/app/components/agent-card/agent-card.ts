import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LucideAngularModule, MapPin, Star, Phone,Mail,ArrowRight } from 'lucide-angular';
import { Agent } from '../../model/agent.model';

@Component({
  selector: 'app-agent-card',
  imports: [CommonModule, LucideAngularModule],
  templateUrl: './agent-card.html',
  styleUrl: './agent-card.css',
})
export class AgentCard {
  @Input() agent !: Agent;

  
  constructor(){}

  readonly MapPin = MapPin;
  readonly Star = Star;
  readonly Phone = Phone;
  readonly Mail = Mail;
  readonly ArrowRight = ArrowRight;

}

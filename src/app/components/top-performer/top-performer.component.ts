import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LucideAngularModule, Trophy, Mail, Search } from 'lucide-angular';

@Component({
    selector: 'app-top-performer',
    standalone: true,
    imports: [CommonModule, LucideAngularModule],
    templateUrl: './top-performer.component.html'
})
export class TopPerformerComponent {
    @Input() bestUser: any = null;
    @Input() activeTab: 'OWNERS' | 'CUSTOMERS' = 'OWNERS';
    @Output() contact = new EventEmitter<any>();

    readonly Trophy = Trophy;
    readonly Mail = Mail;
    readonly Search = Search;
}

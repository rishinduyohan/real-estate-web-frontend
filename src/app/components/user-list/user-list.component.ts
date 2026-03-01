import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LucideAngularModule, Mail, Home, Star, Edit, Trash2, Search } from 'lucide-angular';
import { User } from '../../model/user.model';

@Component({
    selector: 'app-user-list',
    standalone: true,
    imports: [CommonModule, LucideAngularModule],
    templateUrl: './user-list.component.html'
})
export class UserListComponent {
    @Input() users: User[] = [];
    @Input() activeTab: 'OWNERS' | 'CUSTOMERS' = 'OWNERS';
    @Output() edit = new EventEmitter<any>();
    @Output() delete = new EventEmitter<number>();

    readonly Mail = Mail;
    readonly Home = Home;
    readonly Star = Star;
    readonly Edit = Edit;
    readonly Trash2 = Trash2;
    readonly Search = Search;
}

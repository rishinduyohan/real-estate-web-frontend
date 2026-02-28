import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterModule } from '@angular/router';

@Component({
    selector: 'app-cta',
    standalone: true,
    imports: [CommonModule, RouterModule],
    templateUrl: './cta.component.html',
})
export class CtaComponent {
    constructor(private router:Router){}

    onGetStart(){
        this.router.navigate(['/register']);
    }

    onProperties(){
        this.router.navigate(['/properties']);
    }
 }

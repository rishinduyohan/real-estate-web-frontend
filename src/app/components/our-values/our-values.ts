import { CommonModule } from '@angular/common';
import { Component, ElementRef, ViewChild } from '@angular/core';
import { LucideAngularModule,ChevronLeft,ChevronRight, Shield, Heart, Award, Target, Building2, Users, TrendingUp } from 'lucide-angular';

@Component({
  selector: 'app-our-values',
  imports: [LucideAngularModule,CommonModule],
  templateUrl: './our-values.html',
  styleUrl: './our-values.css',
})
export class OurValues {
  readonly Shield = Shield;
  readonly Heart = Heart;
  readonly Award = Award;
  readonly Target = Target;
  readonly Building2 = Building2;
  readonly Users = Users;
  readonly TrendingUp = TrendingUp;
  readonly ChevronLeft = ChevronLeft;
  readonly ChevronRight = ChevronRight;

  values = [
    {
      icon: Shield,
      title: 'Trust & Transparency',
      description: 'We believe in honest and transparent dealings with all our clients',
    },
    {
      icon: Heart,
      title: 'Customer First',
      description: 'Your satisfaction and success is our top priority',
    },
    {
      icon: Award,
      title: 'Excellence',
      description: 'We strive for excellence in every property transaction',
    },
    {
      icon: Target,
      title: 'Innovation',
      description: 'Using technology to make property search easier and faster',
    },
  ];

  @ViewChild('scrollContainer') scrollContainer!: ElementRef;

    scroll(direction: 'left' | 'right') {
        const container = this.scrollContainer.nativeElement;
        const scrollAmount = 400;
        container.scrollBy({
            left: direction === 'left' ? -scrollAmount : scrollAmount,
            behavior: 'smooth'
        });

    }

}

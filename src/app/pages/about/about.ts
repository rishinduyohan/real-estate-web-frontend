import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { NavbarComponent } from '../../components/navbar/navbar.component';
import { FooterComponent } from '../../components/footer/footer.component';
import { LucideAngularModule, Shield, Heart, Award, Target, Building2, Users, TrendingUp } from 'lucide-angular';
import { OurValues } from '../../components/our-values/our-values';
import { Timelines } from '../../components/timelines/timelines';
import { StatsComponent } from '../../components/stats/stats.component';

@Component({
  selector: 'app-about',
  imports: [CommonModule,NavbarComponent, Timelines , FooterComponent, LucideAngularModule, OurValues, StatsComponent],
  templateUrl: './about.html',
  styleUrl: './about.css',
})
export class About {
  readonly Shield = Shield;
  readonly Heart = Heart;
  readonly Award = Award;
  readonly Target = Target;
  readonly Building2 = Building2;
  readonly Users = Users;
  readonly TrendingUp = TrendingUp;

}

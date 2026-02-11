import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { Milestone } from '../../model/milestone.model';

@Component({
  selector: 'app-timelines',
  imports: [CommonModule],
  templateUrl: './timelines.html',
})
export class Timelines {

  milestones:Milestone[] = [
    { year: 2015, event: 'LK Estate Founded', description: 'Started with a vision to revolutionize real estate in Sri Lanka' },
    { year: 2016, event: '1,000 Properties Listed', description: 'Reached our first major milestone' },
    { year: 2017, event: 'Expanded Nationwide', description: 'Opened offices in all major cities' },
    { year: 2021, event: '10,000+ Happy Customers', description: 'Helped thousands find their dream properties' },
    { year: 2023, event: 'Leading Platform', description: 'Became Sri Lanka\'s #1 real estate platform' },
    { year: 2026, event: 'Future Ready', description: 'Continuing to innovate and serve better' },
  ];
}

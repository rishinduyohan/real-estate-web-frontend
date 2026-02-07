import { Component } from '@angular/core';

@Component({
  selector: 'app-property-types',
  imports: [],
  templateUrl: './property-types.html',
  styleUrl: './property-types.css',
})
export class PropertyTypes {
  activeFilter = 'all';

  setActiveFilter(filter: string) {
    this.activeFilter = filter;
  }
}

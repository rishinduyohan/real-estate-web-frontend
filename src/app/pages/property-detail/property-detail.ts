import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { LucideAngularModule, ArrowLeft, Heart, Share2, MapPin, Bed, Bath, Maximize,ChevronLeft, ChevronRight } from 'lucide-angular';
import { PropertyService } from '../../service/property-service.service';
import { Property } from '../../model/property.model';
import { NavbarComponent } from '../../components/navbar/navbar.component';
import { FooterComponent } from '../../components/footer/footer.component';
import { ContactAgent } from "../../components/contact-agent/contact-agent";

@Component({
  selector: 'app-property-detail',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule, LucideAngularModule, NavbarComponent, FooterComponent, ContactAgent],
  templateUrl: './property-detail.html',
  styleUrl: './property-detail.css'
})
export class PropertyDetail implements OnInit {
  property: Property | any;
  currentImageIndex = 0;
  isSaved = false;


  images: string[] = [];

  readonly ArrowLeft = ArrowLeft;
  readonly Heart = Heart;
  readonly Share2 = Share2;
  readonly MapPin = MapPin;
  readonly Bed = Bed;
  readonly Bath = Bath;
  readonly Maximize = Maximize;
  readonly ChevronLeft = ChevronLeft;
  readonly ChevronRight = ChevronRight;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private propertyService: PropertyService
  ) { }

  ngOnInit() {
    this.route.paramMap.subscribe(params => {
      const id = params.get('id');
      if (id) {
        this.propertyService.getPropertyById(+id).subscribe(prop => {
          this.property = prop;
          if (prop && prop.details) {
            this.images = prop.details.images;
          }
        });
      }
    });
  }

  goBack() {
    this.router.navigate(['/properties']);
  }

  nextImage() {
    this.currentImageIndex = (this.currentImageIndex + 1) % this.images.length;
  }

  prevImage() {
    this.currentImageIndex = (this.currentImageIndex - 1 + this.images.length) % this.images.length;
  }

  toggleSave() {
    this.isSaved = !this.isSaved;
  }

}

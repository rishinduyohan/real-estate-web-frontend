import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { LucideAngularModule, ArrowLeft, Heart, Share2, MapPin, Bed, Bath, Maximize, ChevronLeft, ChevronRight } from 'lucide-angular';
import { PropertyService } from '../../service/property-service.service';
import { Property } from '../../model/property.model';
import { AuthService } from '../../service/auth.service';
import { NavbarComponent } from '../../components/navbar/navbar.component';
import { FooterComponent } from '../../components/footer/footer.component';
import { ContactOwner } from "../../components/contact-owner/contact-owner";

@Component({
  selector: 'app-property-detail',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule, LucideAngularModule, NavbarComponent, FooterComponent, ContactOwner],
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
    private propertyService: PropertyService,
    private authService: AuthService
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
          this.checkIfSaved();
        });
      }
    });
  }

  checkIfSaved() {
    if (this.property) {
      const userId = this.authService.getCurrentUserId();
      this.isSaved = this.propertyService.isSaved(userId, this.property.id);
    }
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
    if (!this.property) return;
    const userId = this.authService.getCurrentUserId();
    this.propertyService.toggleSaved(userId, this.property.id).subscribe(isSaved => {
      this.isSaved = isSaved;
    });
  }

}

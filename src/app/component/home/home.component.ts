import {Component, Input, OnChanges, OnInit, SimpleChanges} from '@angular/core';
import {AuthService} from "../../services/auth.service";
import {Kitchen} from "../../models/kitchen.model";
import {KitchenService} from "../../services/kitchen.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent implements OnInit {
  kitchens: Kitchen[] = [];

  constructor(
    public authService: AuthService,
    private kitchenService: KitchenService,
    private router: Router
    ) {
  }

  ngOnInit(): void {
    console.log(this.authService.isLoggedIn$);
    this.authService.isLoggedIn$.subscribe((isLoggedIn: boolean): void => {
      if (isLoggedIn) {
        this.kitchenService.getKitchens().subscribe(
          (kitchens: Kitchen[]): void => {
            this.kitchens.push(...kitchens);
            this.loadKitchenImages();
          }
        )
      }
    })
  }

  onMenu(kitchenId: number): void {
    this.kitchenService.setKitchenId(kitchenId);
    this.router.navigate(['/menus', kitchenId])
  }

  loadKitchenImages(): void {
    this.kitchens.forEach((kitchen: Kitchen): void => {
      this.kitchenService.getImageUrl(kitchen).subscribe((imageUrl: string): void => {
        kitchen.imageUrl = imageUrl;
      })
    })
  }
}

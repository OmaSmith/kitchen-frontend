import {Component, Input, OnChanges, OnInit, SimpleChanges} from '@angular/core';
import {AuthService} from "../../services/auth.service";
import {Kitchen} from "../../models/kitchen.model";
import {KitchenService} from "../../services/kitchen.service";
import {DataService} from "../../services/data.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent implements OnInit {
  kitchens: Kitchen[];

  constructor(
    public authService: AuthService,
    private kitchenService: KitchenService,
    public data: DataService,
    private router: Router
    ) {
  }

  ngOnInit(): void {
    // if (this.authService.getIsLoggedIn()) {
    //   this.kitchenService.getKitchens().subscribe(
    //     (kitchens: Kitchen[]): void => {
    //       this.kitchens = kitchens;
    //     }
    //   )
    // }
    if (this.authService.getIsLoggedIn()) {
      console.log("here check")
      this.kitchens = this.data.getMockData();
    }
  }

  onMenu(kitchenId: number): void {
    this.kitchenService.setKitchenId(kitchenId);
    this.router.navigate(['/menus'])
  }
}

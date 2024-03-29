import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {HomeComponent} from "./component/home/home.component";
import {MenuDisplayComponent} from "./component/menu-display/menu-display.component";
import {CartComponent} from "./component/cart/cart.component";

const routes: Routes = [
  {path: '', component: HomeComponent},
  {path: 'menus/:id', component: MenuDisplayComponent, pathMatch: 'full'},
  {path: 'cart', component: CartComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

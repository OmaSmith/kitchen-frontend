import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AngularMaterialModule } from './modules/angular-material.module';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { NavbarComponent } from './component/navbar/navbar.component';
import { HomeComponent } from './component/home/home.component';
import { RegisterModalComponent } from './component/register-modal/register-modal.component';
import {HTTP_INTERCEPTORS, HttpClientModule} from '@angular/common/http';
import { LoginModalComponent } from './component/login-modal/login-modal.component';
import { UserRegisterModalComponent } from './component/user-register-modal/user-register-modal.component';
import {JwtInterceptor} from "./interceptors/jwt.interceptor";
import {MatDivider} from "@angular/material/divider";
import {MatCard, MatCardContent, MatCardHeader} from "@angular/material/card";
import {MatGridList, MatGridTile} from "@angular/material/grid-list";

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    HomeComponent,
    RegisterModalComponent,
    LoginModalComponent,
    UserRegisterModalComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    AngularMaterialModule,
    HttpClientModule,
    MatDivider,
    MatCard,
    MatCardHeader,
    MatCardContent,
    MatGridList,
    MatGridTile
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: JwtInterceptor,
      multi: true
    },
    provideAnimationsAsync()
  ],
  bootstrap: [AppComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class AppModule { }

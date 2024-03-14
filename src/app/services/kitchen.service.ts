import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Kitchen } from '../models/kitchen.model';
import { KitchenForm } from '../models/kitchen_form.model';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class KitchenService {
  kitchen: Kitchen;
  kitchens: Kitchen[] = [];
  kitchenId: number

  api = "http://localhost:8080/kitchens"
  constructor( private http:HttpClient ) { }

  saveKitchen(kitchen: KitchenForm) {
    return this.http.post<Kitchen>(this.api, kitchen)
  }

  getKitchens():Observable<Kitchen[]> {
    return this.http.get<Kitchen[]>(this.api)
  }

  getKitchen(id: number) {
    const api_url = `${this.api}/${id}`
    return this.http.get<Kitchen[]>(api_url)
  }

  setKitchen(kitchen: Kitchen) {
    this.kitchen = kitchen
  }

  getKitchenId(): number {
    return this.kitchenId;
  }

  setKitchenId(kitchenId: number): void {
    this.kitchenId = kitchenId;
  }
}

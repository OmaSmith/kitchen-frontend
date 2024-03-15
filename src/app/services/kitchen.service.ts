import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Kitchen } from '../models/kitchen.model';
import { KitchenForm } from '../models/kitchen_form.model';
import {map, Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class KitchenService {
  kitchen: Kitchen;
  kitchens: Kitchen[] = [];
  kitchenId: number
  api: string = "http://localhost:8080/kitchens"

  constructor( private http:HttpClient ) { }


  saveKitchen(kitchen) {
    return this.http.post<Kitchen>(this.api, kitchen)
  }

  getKitchens():Observable<Kitchen[]> {
    return this.http.get<Kitchen[]>(this.api)
  }

  getKitchen(id: number): Observable<Kitchen> {
    const api_url = `${this.api}/${id}`
    return this.http.get<Kitchen>(api_url)
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

  getImageUrl(kitchen: Kitchen): Observable<string> {
    const api_url: string = `${this.api}/${kitchen.id}/image`
    return this.http.get(api_url, {responseType: 'blob'}).pipe(
      map((data: Blob) => URL.createObjectURL(data))
    )
  }
}

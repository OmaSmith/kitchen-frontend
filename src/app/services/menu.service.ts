import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {MenuItemsRequest} from '../models/kitchen_menu.model';

@Injectable({
  providedIn: 'root'
})
export class MenuService {

  api: string = "http://localhost:8080/menus"

  constructor(private http: HttpClient) {
  }

  saveMenu(menu: MenuItemsRequest) {
    return this.http.post<void>(this.api, menu)
  }
}

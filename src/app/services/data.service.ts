import { Injectable } from '@angular/core';
import {Kitchen} from "../models/kitchen.model";
import {MenuItems} from "../models/kitchen_menu.model";

@Injectable({
  providedIn: 'root'
})
export class DataService {
  mockData: Kitchen[] = []; // 모의 데이터 저장용 배열
  DAYS_OF_WEEK: string[] = ['MONDAY', 'TUESDAY', 'WEDNESDAY', 'THURSDAY', 'FRIDAY', 'SATURDAY', 'SUNDAY'];

  constructor() {
    for (let i: number = 1; i <= 10; i++) {
      const kitchen: Kitchen = {
        id: i,
        name: `Kitchen ${i}`,
        email: `kitchen${i}@example.com`,
        password: `password${i}`,
        confirm_password: `password${i}`,
        workingDays: [this.DAYS_OF_WEEK[Math.floor(Math.random() * 7)]],
        start_time: this.generateRandomTime(),
        end_time: this.generateRandomTime(),
        menuItems: this.generateRandomMenuItems(i),
        createdAt: new Date(),
        updatedAt: new Date()
      };
      this.mockData.push(kitchen);
    }
  }

  // 모의 데이터 반환
  getMockData(): Kitchen[] {
    return this.mockData;
  }

  // 모의 데이터 업데이트
  updateMockData(updatedData: Kitchen[]): void {
    this.mockData = updatedData;
  }

  private generateRandomTime(): string {
    const hours: number = Math.floor(Math.random() * 24); // 0부터 23까지의 랜덤한 시간 생성
    const minutes: number = Math.floor(Math.random() * 60); // 0부터 59까지의 랜덤한 분 생성

    return `${hours}:${minutes}`;
  }

  generateRandomMenuItems(kitchenId: number): MenuItems[] {
    const items: MenuItems[] = [
      { name: 'Menu Item 1', type: 'Main', price: 10.99, kitchen_id: kitchenId },
      { name: 'Menu Item 2', type: 'Dessert', price: 5.99, kitchen_id: kitchenId },
      { name: 'Menu Item 3', type: 'Appetizer', price: 7.99, kitchen_id: kitchenId }
    ];
    const randomItems: MenuItems[] = [];

    for (let i = 0; i < 3; i++) { // 랜덤으로 3개의 메뉴 아이템 선택
      const randomIndex = Math.floor(Math.random() * items.length);
      randomItems.push(items[randomIndex]);
    }

    return randomItems;
  }

}

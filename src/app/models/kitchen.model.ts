import { Time } from "@angular/common";
import { MenuItems } from "./kitchen_menu.model";

export interface Kitchen {
  id: number,
  name: string,
  workingDays: string[],
  startTime: string,
  endTime: string,
  menuItems: MenuItems[],
  imageUrl?: string
}

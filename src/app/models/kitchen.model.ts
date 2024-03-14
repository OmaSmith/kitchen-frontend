import { Time } from "@angular/common";
import { MenuItems } from "./kitchen_menu.model";

export interface Kitchen {
  id: number,
  name: string,
  email: string,
  password: string,
  confirm_password: string,
  workingDays: string[],
  start_time: string,
  end_time: string,
  menuItems: MenuItems[],
  createdAt: Date,
  updatedAt: Date
}

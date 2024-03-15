import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {Kitchen} from "../../models/kitchen.model";
import {KitchenService} from "../../services/kitchen.service";
import {MatTableDataSource} from "@angular/material/table";
import {SelectionModel} from "@angular/cdk/collections";
import {MenuItems} from "../../models/kitchen_menu.model";


export interface MenuItemsWithPosition extends MenuItems {
  position: number;
}

@Component({
  selector: 'app-menu-display',
  templateUrl: './menu-display.component.html',
  styleUrl: './menu-display.component.css'
})
export class MenuDisplayComponent implements OnInit {
  displayedColumns: string[] = ['select', 'position', 'name', 'type', 'price'];
  dataSource: MatTableDataSource<MenuItemsWithPosition>
  selection: SelectionModel<MenuItemsWithPosition> = new SelectionModel<MenuItemsWithPosition>(true, []);
  position: number = 0;
  kitchen: Kitchen = {
    id: 0,
    name: '',
    workingDays: [],
    startTime: '',
    endTime: '',
    menuItems: [],
    imageUrl: ''
  }

  constructor(private route: ActivatedRoute, private router: Router, private kitchenService: KitchenService) {
  }

  ngOnInit(): void {
    const id = this.route.snapshot.params['id'];
    this.kitchenService.getKitchen(id).subscribe((kitchen: Kitchen) => {
        this.kitchen = kitchen;
        const menuItemsWithPosition: MenuItemsWithPosition[] = this.kitchen.menuItems
          .map((menuItem: MenuItems, index: number) => {
            return {...menuItem, position: index + 1};
          });
        this.dataSource = new MatTableDataSource<MenuItemsWithPosition>(menuItemsWithPosition); // MatTableDataSource에 새로운 배열 전달
      }
    )
  }

  /** Whether the number of selected elements matches the total number of rows. */
  isAllSelected(): boolean {
    const numSelected: number = this.selection.selected.length;
    const numRows: number = this.dataSource.data.length;
    return numSelected === numRows;
  }

  /** Selects all rows if they are not all selected; otherwise clear selection. */
  toggleAllRows(): void {
    if (this.isAllSelected()) {
      this.selection.clear();
      return;
    }

    this.selection.select(...this.dataSource.data);
  }

  /** The label for the checkbox on the passed row */
  checkboxLabel(row?: MenuItemsWithPosition): string {
    if (!row) {
      return `${this.isAllSelected() ? 'deselect' : 'select'} all`;
    }
    return `${this.selection.isSelected(row) ? 'deselect' : 'select'} row ${row.position + 1}`;
  }

  onBack(): void {
    this.router.navigate(['/']);
  }

  onCart(): void {
    this.router.navigate(['/cart'])
  }
}

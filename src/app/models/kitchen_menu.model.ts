export interface MenuItems {
  name: string,
  type: string,
  price: number,
}

export interface MenuItemsRequest {
  name: string,
  type: string,
  price: number,
  kitchen_id: number
}

import { Injectable } from '@angular/core';

export interface BadgeItem {
  type: string;
  value: string;
}

export interface ChildrenItems {
  state: string;
  name: string;
  type?: string;
}

export interface Menu {
  state: string;
  name: string;
  type: string;
  icon: string;
  badge?: BadgeItem[];
  children?: ChildrenItems[];
}

const MENUITEMS: Array<Menu> = [
  {
    state: '/',
    name: 'HOME',
    type: 'link',
    icon: 'explore'
  },
  {
    state: 'ghi-nhat-ky',
    name: 'Ghi nhật ký',
    type: 'link',
    icon: 'note_add'
  },
  {
    state: 'quan-ly-ao',
    name: 'Quản lý ao',
    type: 'link',
    icon: 'view_quilt'
  },
  {
    state: 'quan-ly-vu-nuoi',
    name: 'Quản lý vụ nuôi',
    type: 'link',
    icon: 'view_carousel'
  },
  {
    state: 'quan-ly-chat-thai',
    name: 'Quản lý chất thải',
    type: 'link',
    icon: 'delete_sweep'
  },
  {
    state: 'quan-ly-thu-hoach',
    name: 'Quản lý thu hoạch',
    type: 'link',
    icon: 'attach_money'
  },
  {
    state: 'quan-ly-kho',
    name: 'Quản lý kho',
    type: 'sub',
    icon: 'view_carousel',
    children: [
      {state: 'thuc-an', name: 'Thức ăn'},
      {state: 'co-so-vat-chat', name: 'Cơ sở vật chất'},
      {state: 'thuoc-va-duoc-pham', name: 'Thuốc và Dược phẩm'}
    ]
  },
  {
    state: 'quan-ly-chi-phi',
    name: 'Quản lý chi phí',
    type: 'sub',
    icon: 'view_carousel',
    children: [
      {state: 'tong-chi-phi', name: 'Tổng chi phí'},
      {state: 'thu-hoach', name: 'Thu hoạch'},
      {state: 'nhap-kho', name: 'Nhập kho'},
      {state: 'lich-su-nhap-giong', name: 'Lịch sử nhập giống'},
    ]
  }
];

@Injectable(
  // {
  //   providedIn: 'root'
  // }
)
export class MenuService {

  constructor() { }

  getAll(): Menu[] {
    return MENUITEMS;
  }

  add(menu: Menu) {
    MENUITEMS.push(menu);
  }
}

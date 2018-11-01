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
  // {
  //   state: '/',
  //   name: 'Trang chủ',
  //   type: 'link',
  //   icon: 'explore'
  // },
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
    state: 'quan-ly-chuan-bi-ao',
    name: 'Quản lý chuẩn bị ao',
    type: 'link',
    icon: 'gavel'
  },
  {
    state: 'quan-ly-tha-nuoi',
    name: 'Quản lý thả nuôi',
    type: 'link',
    icon: 'pan_tool'
  },
  {
    state: 'quan-ly-tang-truong',
    name: 'Quản lý tăng trưởng',
    type: 'link',
    icon: 'timeline'
  },
  {
    state: 'quan-ly-thu-hoach',
    name: 'Quản lý thu hoạch',
    type: 'link',
    icon: 'attach_money'
  },
  {
    state: 'quan-ly-chat-thai',
    name: 'Quản lý chất thải',
    type: 'link',
    icon: 'delete_sweep'
  },
  {
    state: 'quan-ly-kho',
    name: 'Quản lý kho',
    type: 'sub',
    icon: 'business',
    children: [
      {state: 'thuc-an', name: 'Thức ăn'},
      {state: 'co-so-vat-chat', name: 'Cơ sở vật chất'},
      {state: 'thuoc-va-duoc-pham', name: 'Thuốc và Dược phẩm'},
      {state: 'giong-nuoi', name: 'Giống nuôi'}
      // {state: 'nhap-kho', name: 'Nhập kho'}
    ]
  },
  {
    state: 'quan-ly-chi-phi',
    name: 'Quản lý chi phí',
    type: 'sub',
    icon: 'style',
    children: [
      {state: 'chi-phi-chuan-bi-ao', name: 'Chi phí chuẩn bị ao'},
      {state: 'chi-phi-cham-soc', name: 'Chi phí chăm sóc'},
      {state: 'thu-hoach', name: 'Thu hoạch'},
    ]
  },
  {
    state: 'quan-ly-phan-quyen',
    name: 'Quản lý phân quyền',
    type: 'link',
    icon: 'record_voice_over'
  },
  {
    state: 'quan-ly-nhan-vien',
    name: 'Quản lý nhân viên',
    type: 'link',
    icon: 'assignment_ind'
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

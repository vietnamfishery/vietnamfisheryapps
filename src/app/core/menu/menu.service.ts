import { Injectable } from '@angular/core';
import { AppService } from 'src/app/app.service';
import { tokenName } from 'src/environments';
import * as jwtDecode from 'jwt-decode';

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
    isRole?: boolean
}

const MENUITEMS: Array<Menu> = [
    {
      state: '/',
      name: 'Trang chủ',
      type: 'link',
      icon: 'explore'
    },
    {
        state: 'nhat-ky',
        name: 'Ghi nhật ký',
        type: 'link',
        icon: 'note_add',
        isRole: false
    },
    {
        state: 'quan-ly-ao',
        name: 'Quản lý ao',
        type: 'link',
        icon: 'view_quilt',
        isRole: false
    },
    {
        state: 'cho-an',
        name: 'Cho ăn',
        type: 'link',
        icon: 'room_service',
        isRole: false
    },
    {
        state: 'su-dung-thuoc-&-duoc-pham',
        name: 'Sử dụng thuốc & dược phẩm',
        type: 'link',
        icon: 'room_service',
        isRole: false
    },
    {
        state: 'quan-ly-vu-nuoi',
        name: 'Quản lý vụ nuôi',
        type: 'link',
        icon: 'view_carousel',
        isRole: false
    },
    {
        state: 'quan-ly-chuan-bi-ao',
        name: 'Quản lý chuẩn bị ao',
        type: 'link',
        icon: 'gavel',
        isRole: false
    },
    {
        state: 'quan-ly-tha-nuoi',
        name: 'Quản lý thả nuôi',
        type: 'link',
        icon: 'pan_tool',
        isRole: false
    },
    {
        state: 'quan-ly-tang-truong',
        name: 'Quản lý tăng trưởng',
        type: 'link',
        icon: 'timeline',
        isRole: false
    },
    {
        state: 'quan-ly-thu-hoach',
        name: 'Quản lý thu hoạch',
        type: 'link',
        icon: 'attach_money',
        isRole: false
    },
    {
        state: 'quan-ly-chat-thai',
        name: 'Quản lý chất thải',
        type: 'link',
        icon: 'delete_sweep',
        isRole: false
    },
    {
        state: 'quan-ly-kho',
        name: 'Quản lý kho',
        type: 'sub',
        icon: 'business',
        children: [
            { state: 'thuc-an', name: 'Thức ăn' },
            { state: 'co-so-vat-chat', name: 'Cơ sở vật chất' },
            { state: 'thuoc-va-duoc-pham', name: 'Thuốc và Dược phẩm' },
            { state: 'giong-nuoi', name: 'Giống nuôi' }
        ],
        isRole: false
    },
    {
        state: 'quan-ly-chi-phi',
        name: 'Quản lý chi phí',
        type: 'sub',
        icon: 'style',
        children: [
            { state: 'chi-phi-chuan-bi-ao', name: 'Chi phí chuẩn bị ao' },
            { state: 'chi-phi-cham-soc', name: 'Chi phí chăm sóc' },
            { state: 'thu-hoach', name: 'Thu hoạch' },
        ],
        isRole: false
    },
    {
        state: 'quan-ly-phan-quyen',
        name: 'Quản lý phân quyền',
        type: 'link',
        icon: 'record_voice_over',
        isRole: true
    },
    {
        state: 'quan-ly-phan-quyen-ao',
        name: 'Quản lý phân quyền ao',
        type: 'link',
        icon: 'assignment_ind',
        isRole: true
    }
];

@Injectable(
    {
      providedIn: 'root'
    }
)
export class MenuService {
    token: string = this.appService.getCookie(tokenName);
    deToken: any = jwtDecode(this.token);
    ownerId: number = this.deToken.createdBy == null && this.deToken.roles.length == 0 ? this.deToken.userId : this.deToken.roles[0].bossId;;
    isBoss: boolean = this.deToken.userId === this.ownerId;
    isPond: boolean = !this.isBoss ? (this.deToken.roles[0] ? this.deToken.roles[0].roles : 0) === 1 ||  (this.deToken.roles[1] ? this.deToken.roles[1].roles : 0) === 1 : false;
    isStorage: boolean = !this.isBoss ? (this.deToken.roles[0] ? this.deToken.roles[0].roles : 0) === 2 ||  (this.deToken.roles[1] ? this.deToken.roles[1].roles : 0) === 2 : false;

    MENUITEMS: Array<Menu> = [
        {
          state: '/',
          name: 'Trang chủ',
          type: 'link',
          icon: 'explore',
          isRole: true
        },
        {
            state: 'nhat-ky',
            name: 'Ghi nhật ký',
            type: 'link',
            icon: 'note_add',
            isRole: this.isBoss || this.isPond
        },
        {
            state: 'quan-ly-ao',
            name: 'Quản lý ao',
            type: 'link',
            icon: 'view_quilt',
            isRole: this.isBoss || this.isPond
        },
        {
            state: 'cho-an',
            name: 'Cho ăn',
            type: 'link',
            icon: 'room_service',
            isRole: this.isBoss || this.isPond
        },
        {
            state: 'su-dung-thuoc-&-duoc-pham',
            name: 'Sử dụng thuốc & dược phẩm',
            type: 'link',
            icon: 'room_service',
            isRole: this.isBoss || this.isPond
        },
        {
            state: 'quan-ly-vu-nuoi',
            name: 'Quản lý vụ nuôi',
            type: 'link',
            icon: 'view_carousel',
            isRole: this.isBoss
        },
        {
            state: 'quan-ly-chuan-bi-ao',
            name: 'Quản lý chuẩn bị ao',
            type: 'link',
            icon: 'gavel',
            isRole: this.isBoss || this.isPond
        },
        {
            state: 'quan-ly-tha-nuoi',
            name: 'Quản lý thả nuôi',
            type: 'link',
            icon: 'pan_tool',
            isRole: this.isBoss || this.isPond
        },
        {
            state: 'quan-ly-tang-truong',
            name: 'Quản lý tăng trưởng',
            type: 'link',
            icon: 'timeline',
            isRole: this.isBoss || this.isPond
        },
        {
            state: 'quan-ly-thu-hoach',
            name: 'Quản lý thu hoạch',
            type: 'link',
            icon: 'attach_money',
            isRole: this.isBoss || this.isPond
        },
        {
            state: 'quan-ly-chat-thai',
            name: 'Quản lý chất thải',
            type: 'link',
            icon: 'delete_sweep',
            isRole: this.isBoss || this.isPond
        },
        {
            state: 'quan-ly-kho',
            name: 'Quản lý kho',
            type: 'sub',
            icon: 'business',
            children: [
                { state: 'thuc-an', name: 'Thức ăn' },
                { state: 'co-so-vat-chat', name: 'Cơ sở vật chất' },
                { state: 'thuoc-va-duoc-pham', name: 'Thuốc và Dược phẩm' },
                { state: 'giong-nuoi', name: 'Giống nuôi' }
            ],
            isRole: this.isBoss || this.isStorage
        },
        {
            state: 'quan-ly-chi-phi',
            name: 'Quản lý chi phí',
            type: 'sub',
            icon: 'style',
            children: [
                { state: 'chi-phi-chuan-bi-ao', name: 'Chi phí chuẩn bị ao' },
                { state: 'chi-phi-cham-soc', name: 'Chi phí chăm sóc' },
                { state: 'thu-hoach', name: 'Thu hoạch' },
            ],
            isRole: this.isBoss
        },
        {
            state: 'quan-ly-phan-quyen',
            name: 'Quản lý phân quyền',
            type: 'link',
            icon: 'record_voice_over',
            isRole: this.isBoss
        },
        {
            state: 'quan-ly-phan-quyen-ao',
            name: 'Quản lý phân quyền ao',
            type: 'link',
            icon: 'assignment_ind',
            isRole: this.isBoss
        }
    ];

    constructor(
        private appService: AppService
    ) {}

    getAll(): Menu[] {
        return this.MENUITEMS;
    }

    add(menu: Menu) {
        MENUITEMS.push(menu);
    }
}

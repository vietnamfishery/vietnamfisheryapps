import { Component, OnInit } from '@angular/core';
import { MenuService } from './menu.service';
import { TranslateService } from '@ngx-translate/core';
import { Location } from '@angular/common';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss'],
  providers: [MenuService]
})
export class MenuComponent implements OnInit {
  private route: ActivatedRoute;
  private location: Location;

  currentLang = 'en';

  constructor(
    public menuService: MenuService,
    public translate: TranslateService
  ) {
    //
  }

  ngOnInit() {
  }

  addMenuItem(): void {
    this.menuService.add({
      state: 'menu',
      name: 'MENU',
      type: 'sub',
      icon: 'trending_flat',
      children: [
        {state: 'menu', name: 'MENU'},
        {state: 'timeline', name: 'MENU'}
      ]
    });
  }

  disableArrow(e){
    console.log(this.route);
  }
}

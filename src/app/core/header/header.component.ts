import { Component, OnInit, EventEmitter, Output } from '@angular/core';
import * as screenfull from 'screenfull';
import { AppService } from 'src/app/app.service';
import { SessionService } from 'src/app/session/session.service';
import { Router } from '@angular/router';


@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  hasStyle: boolean = true;
  @Output() toggleSidenav = new EventEmitter<void>();
  @Output() toggleNotificationSidenav = new EventEmitter<void>();

  constructor(
    private appService: AppService,
    private sessionService: SessionService,
		private router: Router
  ) { }

  ngOnInit() {
  }

  fullScreenToggle(): void {
    if (screenfull.enabled) {
      screenfull.toggle();
    }
  }

  signgout() {
    this.appService.setCookie('171FBD0786DD03FC65808AA5DDD5B00DDD5CA726D1FD9AC0D42C39F317989DA6','','expires=Thu, 01 Jan 1970 00:00:00 UTC');
    this.appService.setCookie('vietnamfishery','','expires=Thu, 01 Jan 1970 00:00:00 UTC');
    this.sessionService.signout();
    this.router.navigate(['session/signin']);
  }
}

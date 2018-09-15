import { Component, OnInit } from '@angular/core';
import { MailService } from './mail.service';
import { PerfectScrollbarConfigInterface } from 'ngx-perfect-scrollbar';
import { Message } from './message';

const SMALL_WIDTH_BREAKPOINT = 960;

@Component({
  selector: 'app-mail',
  templateUrl: './mail.component.html',
  styleUrls: ['./mail.component.scss'],
  providers: [ MailService ]
})
export class MailComponent implements OnInit {
  private mediaMatcher: MediaQueryList = matchMedia(`(max-width: ${SMALL_WIDTH_BREAKPOINT}px)`);

  public config: PerfectScrollbarConfigInterface = {};

  displayMode = 'default';
  multi = false;
  hideToggle = true;

  messages: Message[];
  selectedMessage: Message;
  sidePanelOpened = true;
  constructor() { }

  ngOnInit() {
  }

}

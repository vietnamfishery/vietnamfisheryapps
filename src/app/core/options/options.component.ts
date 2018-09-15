import { Component, OnInit, EventEmitter, Output } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-options',
  templateUrl: './options.component.html',
  styleUrls: ['./options.component.scss']
})
export class OptionsComponent implements OnInit {
  currentLang = 'en';
  showSettings = false;
  options = {
    collapsed: false,
    compact: false,
    boxed: false,
    dark: false,
    dir: 'ltr'
  };

  @Output() messageEvent = new EventEmitter<Object>();
  
  constructor(
    public translate: TranslateService
  ) {
    const browserLang: string = translate.getBrowserLang();
    translate.use(browserLang.match(/en|fr/) ? browserLang : 'en');
  }

  ngOnInit() {
  }

  sendOptions() {
    if (this.options.collapsed === true ) {
      this.options.compact = false;
    }
    if (this.options.compact === true ) {
      this.options.collapsed = false;
    }
    this.messageEvent.emit(this.options);
  }
}

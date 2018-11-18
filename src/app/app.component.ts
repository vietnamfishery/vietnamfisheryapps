import { Component } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { HttpClient } from '@angular/common/http';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss']
})
export class AppComponent {
    constructor(translate: TranslateService, private http: HttpClient) {
        translate.addLangs(['vi', 'en', 'fr']);
        translate.setDefaultLang('vi');
        // const browserLang: string = translate.getBrowserLang();
        translate.use('vi');
    }
}

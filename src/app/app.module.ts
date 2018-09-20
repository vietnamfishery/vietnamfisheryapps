import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { HttpClientModule, HttpClient } from '@angular/common/http';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { LoadingBarRouterModule } from '@ngx-loading-bar/router';

import {
  MatSidenavModule,
  MatCardModule,
  MatMenuModule,
  MatCheckboxModule,
  MatIconModule,
  MatButtonModule,
  MatToolbarModule,
  MatTabsModule,
  MatListModule,
  MatSlideToggleModule,
  MatSelectModule,
  MatProgressBarModule
} from '@angular/material';

import { AppComponent } from './app.component';

import { AppRoutes } from './app.routing';
import { TranslateModule, TranslateLoader } from '@ngx-translate/core';

import { FlexLayoutModule } from '@angular/flex-layout';
import { BidiModule } from '@angular/cdk/bidi';
import { AgmCoreModule } from '@agm/core';
import { PerfectScrollbarModule } from 'ngx-perfect-scrollbar';

import {
  AdminLayoutComponent,
  AuthLayoutComponent,
  HeaderComponent,
  MenuComponent,
  NotificationComponent,
  OptionsComponent,
  SidebarComponent,
  AccordionAnchorDirective,
  AccordionLinkDirective,
  AccordionDirective
} from './core';

export function createTranslateLoader(http: HttpClient) {
  return new TranslateHttpLoader(http, './assets/i18n/', '.json');
}

@NgModule({
  declarations: [
    AppComponent,
    AdminLayoutComponent,
    AuthLayoutComponent,
    HeaderComponent,
    MenuComponent,
    NotificationComponent,
    OptionsComponent,
    SidebarComponent,
    AccordionAnchorDirective,
    AccordionLinkDirective,
    AccordionDirective,
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    RouterModule.forRoot(AppRoutes),
    FormsModule,
    HttpClientModule,
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: (createTranslateLoader),
        deps: [HttpClient]
      }
    }),
    LoadingBarRouterModule,
    MatSidenavModule,
    MatCardModule,
    MatMenuModule,
    MatCheckboxModule,
    MatIconModule,
    MatButtonModule,
    MatToolbarModule,
    MatTabsModule,
    MatListModule,
    MatSlideToggleModule,
    MatSelectModule,
    MatProgressBarModule,
    FlexLayoutModule,
    BidiModule,
    AgmCoreModule.forRoot({ apiKey: 'YOURAPIKEY' }),
    PerfectScrollbarModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }

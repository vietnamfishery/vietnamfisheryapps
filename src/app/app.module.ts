import { BrowserModule } from '@angular/platform-browser';
import { NgModule, LOCALE_ID } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { HttpClientModule, HttpClient } from '@angular/common/http';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { LoadingBarRouterModule } from '@ngx-loading-bar/router';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import localeVi from '@angular/common/locales/vi';
import localeViExtra from '@angular/common/locales/extra/vi';
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
    MatProgressBarModule,
    MatSnackBarModule
} from '@angular/material';

import { environment } from 'src/environments/environment';

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
import { StoreModule } from '@ngrx/store';
import { authorizationReducer } from './rootStores/reducers/authorization.reducer';
import { costStorageReducer } from './rootStores/reducers/storageCost.reducer';
import { breedCostReducer } from './rootStores/reducers/breedCost.reducer';
import { harvestCostReducer } from './rootStores/reducers/harvestCost.reducer';
import { AppService } from './app.service';
import { registerLocaleData } from '@angular/common';
import { SnackBarComponent } from './snack-bar/snack-bar.component';

registerLocaleData(localeVi, 'vi', localeViExtra);
export function createTranslateLoader(http: HttpClient) {
    return new TranslateHttpLoader(http, './assets/i18n/', '.json');
}

import { SocketIoModule, SocketIoConfig } from 'ngx-socket-io';

const config: SocketIoConfig = { url: 'http://localhost:7979', options: {} };

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
        SnackBarComponent
    ],
    imports: [
        BrowserModule,
        BrowserAnimationsModule,
        SocketIoModule.forRoot(config),
        RouterModule.forRoot(AppRoutes, {
            useHash: true
        }),
        FormsModule,
        HttpClientModule,
        TranslateModule.forRoot({
            loader: {
                provide: TranslateLoader,
                useFactory: (createTranslateLoader),
                deps: [HttpClient]
            }
        }),
        StoreModule.forRoot({
            authorization: authorizationReducer,
            storageCost: costStorageReducer,
            breedCost: breedCostReducer,
            harvestCost: harvestCostReducer,
        }),
        StoreDevtoolsModule.instrument({
            maxAge: false
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
        MatSnackBarModule,
        MatSlideToggleModule,
        MatSelectModule,
        MatProgressBarModule,
        FlexLayoutModule,
        BidiModule,
        AgmCoreModule.forRoot({ apiKey: 'AIzaSyBV-uHTqX6aH5_16ZmLa9uv16Op_R4t-1Y' }),
        PerfectScrollbarModule
    ],
    providers: [
        AppService,
        { provide: LOCALE_ID, useValue: 'vi' }
    ],
    entryComponents: [SnackBarComponent],
    bootstrap: [AppComponent]
})
export class AppModule { }

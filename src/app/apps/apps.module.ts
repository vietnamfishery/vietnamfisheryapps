import { NgModule } from '@angular/core';
import 'flatpickr/dist/flatpickr.css';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { AppsRoutingModule } from './apps-routing.module';
import { ChatComponent } from './chat/chat.component';
import { FullcalendarComponent, CalendarDialogComponent } from './fullcalendar/fullcalendar.component';
import { MailComponent } from './mail/mail.component';
import { MediaComponent } from './media/media.component';
import { SocialComponent } from './social/social.component';
import { MatToolbarModule, MatIconModule, MatCardModule, MatInputModule, MatButtonModule, MatButtonToggleModule, MatListModule, MatGridListModule, MatMenuModule, MatSidenavModule, MatProgressBarModule, MatTabsModule, MatDialogModule, MatExpansionModule } from '@angular/material';
import { FlatpickrModule } from 'angularx-flatpickr';
import { FlexLayoutModule } from '@angular/flex-layout';
import { ChartsModule } from 'ng2-charts';
import { PerfectScrollbarModule } from 'ngx-perfect-scrollbar';
import { CalendarModule, CalendarDateFormatter, DateAdapter } from 'angular-calendar';
import { adapterFactory } from 'angular-calendar/date-adapters/date-fns';


@NgModule({
  imports: [
    CommonModule,
    MatToolbarModule,
    MatIconModule,
    MatCardModule,
    MatInputModule,
    MatButtonModule,
    MatButtonToggleModule,
    MatListModule,
    MatGridListModule,
    MatMenuModule,
    MatSidenavModule,
    MatProgressBarModule,
    MatTabsModule,
    MatDialogModule,
    MatExpansionModule,
    FormsModule,
    FlatpickrModule.forRoot(),
    CalendarModule.forRoot({
      provide: DateAdapter,
      useFactory: adapterFactory
    }),
    FlexLayoutModule,
    ChartsModule,
    PerfectScrollbarModule,
    AppsRoutingModule
  ],
  declarations: [
    ChatComponent,
    FullcalendarComponent,
    MailComponent,
    MediaComponent,
    SocialComponent,
    CalendarDialogComponent
  ],
  entryComponents: [ CalendarDialogComponent ]
})
export class AppsModule { }

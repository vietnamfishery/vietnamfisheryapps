import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AppsRoutingModule } from './apps-routing.module';
import { ChatComponent } from './chat/chat.component';
import { FullcalendarComponent } from './fullcalendar/fullcalendar.component';
import { MailComponent } from './mail/mail.component';
import { MediaComponent } from './media/media.component';
import { SocialComponent } from './social/social.component';

@NgModule({
  imports: [
    CommonModule,
    AppsRoutingModule
  ],
  declarations: [
    ChatComponent,
    FullcalendarComponent,
    MailComponent,
    MediaComponent,
    SocialComponent
  ]
})
export class AppsModule { }

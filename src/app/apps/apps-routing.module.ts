import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { FullcalendarComponent } from './fullcalendar/fullcalendar.component';
import { MailComponent } from './mail/mail.component';
import { MediaComponent } from './media/media.component';
import { ChatComponent } from './chat/chat.component';
import { SocialComponent } from './social/social.component';

const routes: Routes = [
  {
    path: '', children: [
      {
        path: 'calendar',
        component: FullcalendarComponent
      },
      {
        path: 'messages',
        component: MailComponent
      },
      {
        path: 'media',
        component: MediaComponent
      },
      {
        path: 'chat',
        component: ChatComponent
      },
      {
        path: 'social',
        component: SocialComponent
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AppsRoutingModule { }

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SessionRoutingModule } from './session-routing.module';
import { ErrorComponent } from './error/error.component';
import { ForgotComponent } from './forgot/forgot.component';
import { LockscreenComponent } from './lockscreen/lockscreen.component';
import { NotFoundComponent } from './not-found/not-found.component';
import { SigninComponent } from './signin/signin.component';
import { SignupComponent } from './signup/signup.component';

@NgModule({
  imports: [
    CommonModule,
    SessionRoutingModule
  ],
  declarations: [ErrorComponent, ForgotComponent, LockscreenComponent, NotFoundComponent, SigninComponent, SignupComponent]
})
export class SessionModule { }

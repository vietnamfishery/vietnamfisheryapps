import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { SessionService } from '../session.service';
import { Observable } from 'rxjs';
import { Store } from '@ngrx/store';
import * as Actions from '../../rootStores/actions';
import { AuthorizationState } from '../../rootStores/models';
import { AppService } from 'src/app/app.service';
import { tokenName, isLogin } from '../../../environments';
import * as jwtDecode from 'jwt-decode';

@Component({
	selector: 'app-signin',
	templateUrl: './signin.component.html',
	styleUrls: ['./signin.component.scss']
})
export class SigninComponent implements OnInit {
	public form: FormGroup;

	constructor(
		private store: Store<AuthorizationState>,
		private fb: FormBuilder,
		private appService: AppService,
		private router: Router,
		private sessionService: SessionService
	) { }

	ngOnInit() {
		this.form = this.fb.group({
			username: [null, Validators.compose([Validators.required])],
			password: [null, Validators.compose([Validators.required])],
			keepLogin: [false, Validators.compose([])]
		});
	}

	onSubmit() {
		this.sessionService.signin(this.form.value).subscribe(res => {
			if(res.success) {
				const userInfo: any = jwtDecode(res.token);
				userInfo[`boss`] = userInfo.boss ? userInfo.boss.length == 0 : false;
				this.store.dispatch(new Actions.Login(userInfo));
				if (this.form.value.keepLogin) {
					this.appService.setCookie(tokenName, res.token, 365);
				} else {
					this.appService.setCookie(tokenName, res.token, 0);
				}
				let redirect: string = this.sessionService.redirectUrl ? this.sessionService.redirectUrl : '/';
				this.router.navigate([redirect]);
			} else {
				this.form.reset();
				this.appService.setCookie(isLogin, res.success.toString(), 0);
				this.sessionService.signout();
			}
		})
	}
}

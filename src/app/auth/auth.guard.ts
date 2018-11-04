import { Injectable }       from '@angular/core';
import {
  CanActivate, Router,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
  CanActivateChild,
  NavigationExtras,
  CanLoad, Route
}                           from '@angular/router';
import { SessionService } from '../session/session.service';
import { Observable } from 'rxjs';
import { Store } from '@ngrx/store';
import * as Actions from '../rootStores/actions';
import { AuthorizationState } from '../rootStores/models';
import { tokenName } from '../../environments';
import { AppService } from '../app.service';
import * as jwtDecode from 'jwt-decode';

@Injectable({
  providedIn: 'root',
})
export class AuthGuard implements CanActivate, CanActivateChild, CanLoad {
  private isLogin: boolean;
  constructor(
    private sessionService: SessionService,
    private appService: AppService,
    private store: Store<AuthorizationState>,
    private router: Router
  ) {
  }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
    let url: string = state.url;

    return this.checkLogin(url);
  }

  canActivateChild(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
    return this.canActivate(route, state);
  }

  canLoad(route: Route): boolean {
    let url = `/${route.path}`;

    return this.checkLogin(url);
  }

  checkLogin(url: string): boolean {
    try{
      this.isLogin = (jwtDecode(this.appService.getCookie(tokenName)) as any).username ? true : false 
    } catch {
      this.isLogin = false;    
    }
    if (this.isLogin) {
      return true;
    }
    // Store the attempted URL for redirecting
    this.sessionService.redirectUrl = url;
    // Navigate to the login page with extras
    this.router.navigate(['/session/signin']);
    return false;
  }
}

@Injectable({
  providedIn: 'root',
})
export class AuthGuarded implements CanActivate, CanActivateChild, CanLoad {
  private isLogin: boolean;
  constructor(
    private sessionService: SessionService,
    private appService: AppService,
    private store: Store<AuthorizationState>,
    private router: Router
  ) {
  }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
    let url: string = state.url;
    return this.checkLogin(url);
  }

  canActivateChild(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
    return this.canActivate(route, state);
  }

  canLoad(route: Route): boolean {
    let url = `/${route.path}`;
    return this.checkLogin(url);
  }

  checkLogin = (url: string): boolean => {
    try{
      this.isLogin = (jwtDecode(this.appService.getCookie(tokenName)) as any).username ? true : false 
    } catch {
      this.isLogin = false;    
    }
    if (this.isLogin) {
      if(url === '/session/signin' || url === '/session/signup' || url === '/session/forgot'){
        this.router.navigate(['/']);
      }
      return true;
    }
    // Store the attempted URL for redirecting
    this.sessionService.redirectUrl = url;
    // Navigate to the login page with extras
    // this.router.navigate(['/session/signin']);
    return true;
  }
}

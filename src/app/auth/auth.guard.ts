import { Injectable } from '@angular/core';
import {
    CanActivate, Router,
    ActivatedRouteSnapshot,
    RouterStateSnapshot,
    CanActivateChild,
    NavigationExtras,
    CanLoad, Route
} from '@angular/router';
import { SessionService } from '../session/session.service';
import { Store } from '@ngrx/store';
import { AuthorizationState } from '../rootStores/models';
import { AppService } from '../app.service';
import * as jwtDecode from 'jwt-decode';
import { find } from 'lodash';
import { tokenName } from '../constants/constant';

@Injectable({
    providedIn: 'root',
})
export class AuthGuard implements CanActivate, CanActivateChild, CanLoad {
    private isLogin: boolean;
    constructor(
        private sessionService: SessionService,
        private appService: AppService,
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
        try {
            this.isLogin = (jwtDecode(this.appService.getCookie(tokenName)) as any).isLogin;
        } catch {
            this.isLogin = false;
        }
        if (this.isLogin) {
            // this.router.navigate['/']
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
        try {
            this.isLogin = (jwtDecode(this.appService.getCookie(tokenName)) as any).isLogin
        } catch {
            this.isLogin = false;
        }
        if (this.isLogin) {
            if (url === '/session/signin' || url === '/session/signup' || url === '/session/forgot') {
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

@Injectable({
    providedIn: 'root',
})
export class NotNullRoleGuard implements CanActivate, CanActivateChild, CanLoad {
    private isNotNullRole: boolean;
    constructor(
        private sessionService: SessionService,
        private appService: AppService,
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
        try {
            const deToken: any = jwtDecode(this.appService.getCookie(tokenName));
            const isBoss: boolean = !deToken.createdBy;
            this.isNotNullRole = isBoss ? isBoss : !(!deToken.roles.length && !deToken.employees.length);
        } catch {
            this.isNotNullRole = true;
        }
        if (this.isNotNullRole) {
            // this.router.navigate['/']
            return true;
        }
        // Store the attempted URL for redirecting
        this.sessionService.redirectUrl = url;
        // Navigate to the login page with extras
        this.router.navigate(['/session/error']);
        return false;
    }
}


@Injectable({
    providedIn: 'root',
})
export class AuthGuardBoss implements CanActivate, CanActivateChild, CanLoad {
    private isBoss: boolean;
    constructor(
        private sessionService: SessionService,
        private appService: AppService,
        private router: Router
    ) {
    }

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
        let url: string = state.url;
        return this.checkBoss(url);
    }

    canActivateChild(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
        return this.canActivate(route, state);
    }

    canLoad(route: Route): boolean {
        let url = `/${route.path}`;
        return this.checkBoss(url);
    }

    checkBoss = (url: string): boolean => {
        this.appService.getCookie(tokenName)
        try {
            this.isBoss = !(jwtDecode(this.appService.getCookie(tokenName)) as any).roles.length && (jwtDecode(this.appService.getCookie(tokenName)) as any).createdBy === null;
        } catch {
            this.isBoss = false;
        }
        if (!this.isBoss) {
            this.router.navigate(['/session/404'])
        }
        return this.isBoss;
    }
}

@Injectable({
    providedIn: 'root',
})
export class AuthGuardPond implements CanActivate, CanActivateChild, CanLoad {
    private isRole: boolean;
    constructor(
        private sessionService: SessionService,
        private appService: AppService,
        private router: Router
    ) {
    }

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
        let url: string = state.url;
        return this.checkPondRoles(url);
    }

    canActivateChild(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
        return this.canActivate(route, state);
    }

    canLoad(route: Route): boolean {
        let url = `/${route.path}`;
        return this.checkPondRoles(url);
    }

    checkPondRoles = (url: string): boolean => {
        this.appService.getCookie(tokenName)
        try {
            this.isRole = !!find((jwtDecode(this.appService.getCookie(tokenName)) as any).roles, e => e.roles === 1) || !(jwtDecode(this.appService.getCookie(tokenName)) as any).roles.length;

        } catch {
            this.isRole = false;
        }
        if (!this.isRole) {
            this.router.navigate(['/session/404'])
        }
        return this.isRole;
    }
}

@Injectable({
    providedIn: 'root',
})
export class AuthGuardStorage implements CanActivate, CanActivateChild, CanLoad {
    private isRole: boolean;
    constructor(
        private sessionService: SessionService,
        private appService: AppService,
        private router: Router
    ) {
    }

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
        let url: string = state.url;
        return this.checkPondRoles(url);
    }

    canActivateChild(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
        return this.canActivate(route, state);
    }

    canLoad(route: Route): boolean {
        let url = `/${route.path}`;
        return this.checkPondRoles(url);
    }

    checkPondRoles = (url: string): boolean => {
        this.appService.getCookie(tokenName)
        try {
            this.isRole = !!find((jwtDecode(this.appService.getCookie(tokenName)) as any).roles, e => e.roles === 2) || !(jwtDecode(this.appService.getCookie(tokenName)) as any).roles.length;
        } catch {
            this.isRole = false;
        }
        if (!this.isRole) {
            this.router.navigate(['/session/404'])
        }
        return this.isRole;
    }
}

@Injectable({
    providedIn: 'root',
})
export class AuthGuardPondWithUser implements CanActivate, CanActivateChild, CanLoad {
    private isRole: boolean;
    constructor(
        private sessionService: SessionService,
        private appService: AppService,
        private router: Router
    ) {
    }

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
        let url: string = state.url;
        return this.checkPondRoles(url, route);
    }

    canActivateChild(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
        return this.canActivate(route, state);
    }

    canLoad(route: Route): boolean {
        let url = `/${route.path}`;
        return this.checkPondRoles(url, route as any);
    }

    checkPondRoles = (url: string, route: ActivatedRouteSnapshot): boolean => {
        this.appService.getCookie(tokenName)
        try {
            this.isRole = !!find((jwtDecode(this.appService.getCookie(tokenName)) as any).pondUserRole, e => e.pond.pondUUId === route.params.get('pondUUID'))
        } catch {
            this.isRole = false;
        }
        if (!this.isRole) {
            this.router.navigate(['/session/404'])
        }
        return this.isRole;
    }
}
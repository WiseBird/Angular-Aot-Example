import {Injectable} from '@angular/core';
import {Route, ActivatedRouteSnapshot, CanActivate, RouterStateSnapshot} from '@angular/router';
import {Observable} from 'rxjs';

@Injectable()
export class SecurityGuard implements CanActivate {

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> | boolean {
        return Observable.of(true);
    }
}

export function AddSecurityGuard(...routes: Route[]): Route[] {
    routes.forEach(route => {
        if (route.children && route.children.length) {
            AddSecurityGuard(...route.children);
        }

        route.canActivate = route.canActivate || [];
        route.canActivate.push(SecurityGuard);
    });

    return routes;
}
import {ModuleWithProviders} from '@angular/core';
import {Routes, ExtraOptions, RouterModule} from '@angular/router';
import {HomeComponent} from './home/home.component';
import {AddSecurityGuard, SecurityGuard} from './security.guard';

export const appRoutes: Routes = [{
    path: '',
    component: HomeComponent,
}, {
    path: 'lazy',
    loadChildren: './lazy/lazy.module#LazyModule',
}, {
    path: 'framework',
    loadChildren: './framework/framework.module#FrameworkModule',
}];

AddSecurityGuard(...appRoutes);

export const appRoutingOpts: ExtraOptions = {
    useHash: false,
    enableTracing: false,
};

export const routing: ModuleWithProviders = RouterModule.forRoot(
    appRoutes,
    appRoutingOpts,
);


export const appRoutingProviders: any[] = [
    SecurityGuard,
];
import {Routes, ExtraOptions} from '@angular/router';
import {HomeComponent} from './home/home.component';

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

export const appRoutingOpts: ExtraOptions = {
    useHash: false,
    enableTracing: false,
};

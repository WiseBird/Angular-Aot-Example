import {Routes, ExtraOptions} from '@angular/router';
import {HomeComponent} from './home/home.component';

export const appRoutes: Routes = [{
    path: '',
    component: HomeComponent,
}, {
    path: 'lazy',
    loadChildren: './lazy/lazy.module#LazyModule',
}];

export const appRoutingOpts: ExtraOptions = {
    useHash: false,
    enableTracing: false,
};

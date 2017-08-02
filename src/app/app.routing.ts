import {Routes, ExtraOptions} from '@angular/router';
import {HomeComponent} from './home/home.component';

export const appRoutes: Routes = [{
    path: '',
    component: HomeComponent,
}];

export const appRoutingOpts: ExtraOptions = {
    useHash: false,
    enableTracing: false,
};

import {Routes} from '@angular/router';
import {ButtonsGuideComponent} from './components-guide/buttons-guide/buttons-guide.component';

export const frameworkRoutes: Routes = [{
    path: 'button',
    component: ButtonsGuideComponent,
    data: {title: 'Buttons guide'},
}];
import {Routes} from '@angular/router';
import {ButtonsGuideComponent} from './components-guide/buttons-guide/buttons-guide.component';
import {DropdownsGuideComponent} from './components-guide/dropdowns-guide/dropdowns-guide.component';

export const frameworkRoutes: Routes = [{
    path: 'button',
    component: ButtonsGuideComponent,
    data: {title: 'Buttons guide'},
}, {
    path: 'dropdown',
    component: DropdownsGuideComponent,
    data: {title: 'Dropdowns guide'},
}];
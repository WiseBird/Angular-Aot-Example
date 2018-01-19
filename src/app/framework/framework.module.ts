import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {RouterModule} from '@angular/router';
import {PreviewComponent} from './_shared/preview/preview.component';
import {ButtonsGuideComponent} from './components-guide/buttons-guide/buttons-guide.component';
import {frameworkRoutes} from './framework.routes';

@NgModule({
    imports: [
        CommonModule,
        RouterModule.forChild(frameworkRoutes),
    ],
    declarations: [
        PreviewComponent,
        ButtonsGuideComponent,
    ],
})
export class FrameworkModule {
}
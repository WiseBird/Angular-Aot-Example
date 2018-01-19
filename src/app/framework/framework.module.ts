import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {RouterModule} from '@angular/router';
import {PreviewComponent} from './_shared/preview/preview.component';
import {ButtonsGuideComponent} from './components-guide/buttons-guide/buttons-guide.component';
import {DropdownsGuideComponent} from './components-guide/dropdowns-guide/dropdowns-guide.component';
import {SectionComponent} from './components-guide/dropdowns-guide/sections/section.component';
import {frameworkRoutes} from './framework.routes';

@NgModule({
    imports: [
        CommonModule,
        RouterModule.forChild(frameworkRoutes),
    ],
    declarations: [
        PreviewComponent,
        ButtonsGuideComponent,
        DropdownsGuideComponent,
        SectionComponent,
    ],
    entryComponents: [
        SectionComponent,
    ]
})
export class FrameworkModule {
}
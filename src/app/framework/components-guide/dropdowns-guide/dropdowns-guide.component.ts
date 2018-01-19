import {Component} from '@angular/core';
import {Preview} from '../../_shared/preview/preview.component';
import {SectionComponent} from './sections/section.component';

@Component({
    selector: 'beh-dropdowns-guide',
    templateUrl: './dropdowns-guide.template.html',
    styleUrls: ['./dropdowns-guide.style.scss'],
})
export class DropdownsGuideComponent {
    previews: Preview[] = [{
        title: 'Loading',
        template: require('./sections/section.template.html'),
        code: require('!!raw-loader!./sections/section.component.ts'),
        component: SectionComponent,
    }];
}
import {Component} from '@angular/core';
import {Preview} from '../../_shared/preview/preview.component';

@Component({
    selector: 'beh-buttons-guide',
    templateUrl: './buttons-guide.template.html',
    styleUrls: ['./buttons-guide.style.scss'],
})
export class ButtonsGuideComponent {
    defaultButton: Preview = {template: require('./sections/default-button.html')};
}
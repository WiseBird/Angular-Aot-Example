import {Component, ChangeDetectionStrategy} from '@angular/core';

@Component({
    selector: 'beh-section',
    templateUrl: './section.template.html',
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SectionComponent {

    constructor() {
        console.log('test');
    }
}
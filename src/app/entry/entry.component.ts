import {Component} from '@angular/core';

@Component({
               selector: 'app-entry',
               template: `{{ text }}`,
           })
export class EntryComponent {
    text: string;

    constructor() {

    }
}

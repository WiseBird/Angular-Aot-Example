import {Component, ElementRef} from '@angular/core';

@Component({
               selector: 'app-empty',
               template: '',
           })
export class EmptyComponent {
    constructor(elementRef: ElementRef) {
        console.log(elementRef.nativeElement);
    }
}

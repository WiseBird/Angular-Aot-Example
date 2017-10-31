import {Component, ComponentFactoryResolver, ElementRef, OnInit, ViewContainerRef} from '@angular/core';
import {EntryComponent} from '../entry/entry.component';

@Component({
               selector: 'app-home',
               templateUrl: './home.component.html',
               styleUrls: ['./home.component.scss']
           })
export class HomeComponent implements OnInit {
    title = 'Home!';

    constructor(
        private viewContainerRef: ViewContainerRef,
        private componentFactoryResolver: ComponentFactoryResolver,
    ) {
    }

    ngOnInit() {
        let factory = this.componentFactoryResolver.resolveComponentFactory<EntryComponent>(EntryComponent);
        let component = this.viewContainerRef.createComponent(factory);
        component.instance.text = 'created';
    }
}

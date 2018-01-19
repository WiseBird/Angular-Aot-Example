import {ViewContainerRef, ViewChild, ComponentFactory, AfterViewInit, Input, Component, Type} from '@angular/core';
import {ComponentUtils} from '../component-utils.service';

export interface Preview {
    title?: string;
    template?: string;
    code?: string;
    component?: Type<any>;
    modules?: Type<any>[];
}

@Component({
    selector: 'beh-preview',
    templateUrl: './preview.template.html',
    styleUrls: ['./preview.style.scss'],
})
export class PreviewComponent implements AfterViewInit {

    @Input() preview: Preview;

    @ViewChild('previewContainer', {read: ViewContainerRef}) previewContainer: ViewContainerRef;

    private static componentsFactories = new Map<Type<any>, Promise<ComponentFactory<any>>>();

    constructor(
        private componentUtils: ComponentUtils,
    ) {
    }

    ngAfterViewInit() {
        this.getFactory()
            .then(factory => {
                this.previewContainer.createComponent(factory);
            });
    }

    private getFactory(): Promise<ComponentFactory<any>> {
        let cachedFactory = this.getCachedFactory();
        if (cachedFactory) {
            return cachedFactory;
        }

        let factory = this.createFactory();
        this.cacheFactory(factory);
        return factory;
    }
    private getCachedFactory(): Promise<ComponentFactory<any>> {
        if (this.preview.component) {
            let cachedFactory = PreviewComponent.componentsFactories.get(this.preview.component);
            if (cachedFactory) {
                return cachedFactory;
            }
        }

        return null;
    }
    private cacheFactory(factory: Promise<ComponentFactory<any>>) {
        PreviewComponent.componentsFactories.set(this.preview.component, factory);
    }
    private createFactory(): Promise<ComponentFactory<any>> {
        let component = this.getComponent();
        return this.componentUtils.compileComponent(component, {
                imports: [
                    ...(this.preview.modules || []),
                ],
            },
        );
    }
    private getComponent(): Type<any> {
        if (this.preview.component) {
            return this.preview.component;
        } else if (this.preview.template) {
            return this.componentUtils.createDynamicComponent({
                template: this.preview.template,
            });
        } else {
            throw new Error('Malformed preview');
        }
    }
}
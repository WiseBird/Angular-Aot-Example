import {CommonModule} from '@angular/common';
import {
    Compiler,
    Component,
    ComponentFactory,
    Injectable,
    ModuleWithComponentFactories,
    NgModule,
    Type,
} from '@angular/core';

@Injectable()
export class ComponentUtils {
    constructor(
        private compiler: Compiler,
    ) {
    }

    private static dynamicComponentId = 0;
    public createDynamicComponent(metadata: Partial<Component>): Type<any> {
        metadata = {
            selector: 'beh-dynamic-component-' + ComponentUtils.dynamicComponentId++,
            ...metadata,
        };

        let cmpClass = class DynamicComponent {
        };
        return Component(metadata)(cmpClass);
    }
    public compileComponent<T>(
        component: Type<T>,
        moduleMetadata: Partial<NgModule> = {},
    ): Promise<ComponentFactory<any>> {
        moduleMetadata.imports = moduleMetadata.imports || [];
        moduleMetadata.declarations = moduleMetadata.declarations || [];

        moduleMetadata.imports.push(CommonModule);
        moduleMetadata.declarations.push(component);

        @NgModule(moduleMetadata)
        class DynamicHtmlModule {
        }

        return this.compiler.compileModuleAndAllComponentsAsync(DynamicHtmlModule)
            .then((moduleWithComponentFactory: ModuleWithComponentFactories<any>) => {
                return moduleWithComponentFactory.componentFactories.find(x => x.componentType === component);
            });
    }
}
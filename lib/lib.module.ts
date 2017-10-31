import {ModuleWithProviders, NgModule} from '@angular/core';
import {LibComponent} from './lib.component';

@NgModule({
              imports: [
              ],
              declarations: [
                  LibComponent,
              ],
              exports: [
                  LibComponent,
              ],
          })
export class LibModule {
    static forRoot(): ModuleWithProviders {
        return {
            ngModule: this,
            providers: [
            ],
        };
    }
}

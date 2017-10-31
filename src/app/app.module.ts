import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {RouterModule} from '@angular/router';

import {AppComponent} from './root/app.component';
import {HomeComponent} from 'home/home.component';
import {appRoutes, appRoutingOpts} from './app.routing';
import {EmptyComponent} from './empty/empty.component';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {EntryComponent} from './entry/entry.component';
import {Ng2BootstrapModule} from 'ngx-bootstrap';
import {LibModule} from '../../lib/lib.module';

@NgModule({
              imports: [
                  BrowserModule,
                  FormsModule,
                  ReactiveFormsModule,
                  RouterModule.forRoot(appRoutes, appRoutingOpts),

                  Ng2BootstrapModule.forRoot(),
                  LibModule/*.forRoot()*/,
              ],
              declarations: [
                  AppComponent,
                  HomeComponent,
                  EmptyComponent,
                  EntryComponent,
              ],
              entryComponents: [
                  EntryComponent,
              ],
              bootstrap: [
                  AppComponent,
              ],
              providers: [],
          })
export class AppModule {
}

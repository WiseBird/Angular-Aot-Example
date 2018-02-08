import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {RouterModule} from '@angular/router';

import {AppComponent} from './root/app.component';
import {HomeComponent} from 'home/home.component';
import {appRoutingProviders, routing} from './app.routing';
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

                  Ng2BootstrapModule.forRoot(),
                  LibModule.forRoot(),

                  routing,
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
              providers: [
                  appRoutingProviders,
              ],
          })
export class AppModule {
}

import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {RouterModule} from '@angular/router';

import {AppComponent} from './root/app.component';
import {HomeComponent} from 'home/home.component';
import {appRoutes, appRoutingOpts} from './app.routing';
import {EmptyComponent} from './empty/empty.component';

@NgModule({
              imports: [
                  BrowserModule,
                  RouterModule.forRoot(appRoutes, appRoutingOpts),
              ],
              declarations: [
                  AppComponent,
                  HomeComponent,
                  EmptyComponent,
              ],
              bootstrap: [
                  AppComponent,
              ],
              providers: [],
          })
export class AppModule {
}

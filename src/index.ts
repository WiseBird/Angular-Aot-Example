import 'reflect-metadata';
import 'zone.js/dist/zone';
import {platformBrowserDynamic} from '@angular/platform-browser-dynamic';
import {AppModule} from './app/app.module';

import './styles/main.scss';
import './styles/additional.css';

platformBrowserDynamic().bootstrapModule(AppModule);

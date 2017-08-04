import 'reflect-metadata';
import 'zone.js/dist/zone';
import {platformBrowser} from '@angular/platform-browser';
import {AppModuleNgFactory} from '../compiled/src/app/app.module.ngfactory';

import './styles/main.scss';
import './styles/additional.css';

platformBrowser().bootstrapModuleFactory(AppModuleNgFactory);

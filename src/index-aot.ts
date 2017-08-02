import 'zone.js/dist/zone';
import {platformBrowser} from '@angular/platform-browser';
import {AppModuleNgFactory} from '../compiled/src/app/app.module.ngfactory';

platformBrowser().bootstrapModuleFactory(AppModuleNgFactory);

import 'zone.js'; // Must be first import
import { bootstrapApplication } from '@angular/platform-browser';
// import { appConfig } from './app/app.config';
import { App } from './app/app';

import { provideRouter } from '@angular/router';
import { routes } from './app/app.routes';

bootstrapApplication(App,{
  providers: [
    provideRouter(routes)
  ]
}).catch((err) => console.error(err));

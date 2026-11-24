import { ApplicationConfig, provideBrowserGlobalErrorListeners } from '@angular/core';
import { provideRouter } from '@angular/router';
import { provideHttpClient } from '@angular/common/http';

import { routes } from './app.routes';

export const appConfig: ApplicationConfig = {
  //aca se registra lso servicios globales
  providers: [
    //provideBrowserGlobalErrorListeners(),
    //provideRouter(routes)
    provideRouter(routes),
    provideHttpClient()
  ]
};

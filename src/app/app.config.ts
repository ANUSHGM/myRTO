import { ApplicationConfig, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { provideClientHydration } from '@angular/platform-browser';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { MAT_DATE_FORMATS, MAT_DATE_LOCALE } from '@angular/material/core';
import { MY_DATE_FORMATS } from './app.module';
import { MAT_MOMENT_DATE_ADAPTER_OPTIONS } from '@angular/material-moment-adapter';
import { enGB } from 'date-fns/locale';
import { provideHttpClient } from '@angular/common/http';

export const appConfig: ApplicationConfig = {

  
  providers: [provideZoneChangeDetection({ eventCoalescing: true }), provideRouter(routes), provideClientHydration(), provideAnimationsAsync(),provideHttpClient(), provideRouter(routes),

    { provide: MAT_DATE_LOCALE, useValue: 'en-GB' }, // Optional: Set locale
    { provide: MAT_DATE_FORMATS, useValue: MY_DATE_FORMATS }, // Optional: Use custom date formats
    { provide: MAT_MOMENT_DATE_ADAPTER_OPTIONS, useValue: { strict: true } }, // Moment.js options
    { provide: MAT_DATE_LOCALE, useValue: 'en-GB' },  // Set locale if needed
    { provide: MAT_MOMENT_DATE_ADAPTER_OPTIONS, useValue: { strict: true } },  // Optional: Strict parsing with Moment.js
    { provide: MAT_DATE_LOCALE, useValue: enGB } // Set locale if needed
    
  ]
};

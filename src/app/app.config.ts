import { ApplicationConfig, importProvidersFrom } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { provideNzIcons } from './icons-provider';
import { de_DE, provideNzI18n } from 'ng-zorro-antd/i18n';
import { registerLocaleData } from '@angular/common';
import de from '@angular/common/locales/de';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { provideAnimations } from '@angular/platform-browser/animations';

registerLocaleData(de);

export const appConfig: ApplicationConfig = {
  providers: [provideRouter(routes), provideNzIcons(), provideNzI18n(de_DE), importProvidersFrom(FormsModule), importProvidersFrom(HttpClientModule), provideAnimations()]
};

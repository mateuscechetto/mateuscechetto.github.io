import { enableProdMode, importProvidersFrom } from '@angular/core';

import { httpTranslateLoaderFactory } from './app/app.module';
import { environment } from './environments/environment';
import { AppComponent } from './app/app.component';
import { TranslateModule, TranslateLoader } from '@ngx-translate/core';
import { GalleryModule } from 'ng-gallery';
import { provideAnimations } from '@angular/platform-browser/animations';
import { AngularDraggableModule } from 'angular2-draggable';
import { withInterceptorsFromDi, provideHttpClient, HttpClient } from '@angular/common/http';
import { BrowserModule, bootstrapApplication } from '@angular/platform-browser';

if (environment.production) {
  enableProdMode();
}

bootstrapApplication(AppComponent, {
    providers: [
        importProvidersFrom(BrowserModule, AngularDraggableModule, GalleryModule, TranslateModule.forRoot({
            loader: {
                provide: TranslateLoader,
                useFactory: httpTranslateLoaderFactory,
                deps: [HttpClient]
            }
        })),
        provideHttpClient(withInterceptorsFromDi()),
        provideAnimations()
    ]
})
  .catch(err => console.error(err));

import { HttpClient, HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';

import { AppComponent } from './app.component';
import { DesktopComponent } from './desktop/desktop.component';
import { StartBarComponent } from './start-bar/start-bar.component';
import { AboutComponent } from './about/about.component';
import { AngularDraggableModule } from 'angular2-draggable';
import { WindowComponent } from './window/window.component';

// Factory function required during AOT compilation
export function httpTranslateLoaderFactory(http: HttpClient) {
  return new TranslateHttpLoader(http);
}

@NgModule({
  declarations: [
    AppComponent,
    DesktopComponent,
    StartBarComponent,
    AboutComponent,
    WindowComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    AngularDraggableModule,
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: httpTranslateLoaderFactory,
        deps: [HttpClient]
      }
    })
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }

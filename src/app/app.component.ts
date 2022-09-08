import { Component } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'portfolio';

  constructor(
    public translate: TranslateService,
  ) {
    translate.addLangs(['en-US', 'pt-BR']);
    translate.setDefaultLang('en-US');
  }

  translateLanguageTo(language: string) {
    this.translate.use(language);
  }

}

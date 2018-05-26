import { Component } from '@angular/core';
import {TranslateService} from '@ngx-translate/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.less']
})
export class AppComponent {
  title = 'app';
  constructor(private translate: TranslateService) {
    translate.addLangs(['en', 'ru']);
    translate.setDefaultLang('en');

    const storageLang = window.localStorage.getItem('lang');
    if (storageLang) {
      this.translate.use(storageLang);
    } else {
      const browserLang = translate.getBrowserLang();
      translate.use(browserLang.match(/en|ru/) ? browserLang : 'en');
    }
  }

  switchLanguage(language: string) {
    this.translate.use(language);
    window.localStorage.setItem('lang', language);
  }
}

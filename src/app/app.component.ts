import { Component } from '@angular/core';
import {TranslateService} from '@ngx-translate/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  switch = false;

  constructor(
    private translate: TranslateService
  ) {
    translate.setDefaultLang('fr');
  }

  changeLanguage(): void {
    this.switch = !this.switch;
    this.switch ? this.useLanguage('en') : this.useLanguage('fr');
  }

  useLanguage(language: string): void {
    this.translate.use(language);
  }
}

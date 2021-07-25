import { Component } from '@angular/core';

@Component({
  selector: 'app-languages',
  templateUrl: './languages.component.html',
  styleUrls: ['./languages.component.scss'],
})
export class LanguagesComponent {
  lang: 'en' | 'ru' = 'en';

  chooseLanguage(): void {
    this.lang = this.lang === 'ru' ? 'en' : 'ru';
  }
}

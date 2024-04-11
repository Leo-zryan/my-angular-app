import { Dictionary } from 'src/app/core/models/dictionary';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { LanguageHelper } from '../helpers/language.helper';
import { LanguageModel } from '../models/language.model';
import { NzI18nService } from 'ng-zorro-antd/i18n';
import { WebApiService } from './web-api.service';
import { literal } from 'src/assets/literal';
@Injectable({
  providedIn: 'root'
})
export class LiteralService extends WebApiService {
  constructor(
    protected override http: HttpClient,
    private i18n: NzI18nService
  ) {
    super(http);
  }
  //#region fields
  private data: Dictionary<Dictionary<string>> = literal;
  private missedKeys: string[] = [];
  private language: LanguageModel = LanguageHelper.defaultLanguage;
  //#endregion
  //#region methods
  private translateByDefault(key: string) {
    if (this.data[LanguageHelper.defaultLanguage.code][key]) {
      this.warn(key, true);
      return this.data[LanguageHelper.defaultLanguage.code][key];
    } else {
      this.warn(key, false);
      return key;
    }
  }
  private warn(key: string, hasDowngrade: boolean) {
    if (!this.missedKeys.includes(key)) {
      this.missedKeys.push(key);
      if (hasDowngrade) {
        console.warn(
          `The literal '${key}' is not translated in ${this.language.code}, will downgrade to ${LanguageHelper.defaultLanguage.code}.`
        );
      } else {
        console.warn(`The literal '${key}' is not translated yet.`);
      }
      const literals: Dictionary<string> = {};
      this.missedKeys.forEach(key => {
        literals[key] = key;
      });
      window['literals'] = literals;
    }
  }
  setLanguage(language: LanguageModel) {
    this.language = language;
    this.i18n.setLocale(language.locale);
  }
  translate(key: string) {
    if (this.data[this.language.code]) {
      if (this.data[this.language.code][key]) {
        return this.data[this.language.code][key];
      } else {
        return this.translateByDefault(key);
      }
    } else if (this.data[LanguageHelper.defaultLanguage.code]) {
      return this.translateByDefault(key);
    } else {
      return key;
    }
  }
  //#endregion
}

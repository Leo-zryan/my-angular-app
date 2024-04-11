import { en_US, ja_JP, zh_CN } from 'ng-zorro-antd/i18n';
import { LanguageModel } from '../models/language.model';
export class LanguageHelper {
  static en = 'en-US';
  static ja = 'ja-JP';
  static zh = 'zh-CN';
  static defaultLanguage: LanguageModel = {
    code: LanguageHelper.en,
    locale: en_US
  };
  static languages: LanguageModel[] = [
    LanguageHelper.defaultLanguage,
    {
      code: LanguageHelper.ja,
      locale: ja_JP
    },
    {
      code: LanguageHelper.zh,
      locale: zh_CN
    }
  ];
  /**
   * get the language model by the language code
   * @param languageCode string
   * @returns LanguageModel
   */
  static getLanguage(languageCode: string): LanguageModel {
    const language = this.languages.find(x => x.code === languageCode);
    if (language) {
      return language;
    } else {
      console.log(`Language ${languageCode} is not find, downgrade to en-US.`);
      return this.languages[0];
    }
  }
}

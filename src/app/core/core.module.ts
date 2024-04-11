import { A11yModule } from '@angular/cdk/a11y';
import { CommonModule, registerLocaleData } from '@angular/common';
import { DragDropModule } from '@angular/cdk/drag-drop';
import { en_US, ja_JP, zh_CN, NZ_I18N } from 'ng-zorro-antd/i18n';
import { ErrorInterceptor } from './interceptors/error.interceptor';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { ItemPipe } from './pipes/option-item.pipe';
import { NzTimePickerModule } from 'ng-zorro-antd/time-picker';
import { JWTInterceptor } from './interceptors/jwt.interceptor';
import { LOCALE_ID, NgModule } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { NgAutoAnimateDirective } from 'ng-auto-animate';
import { NgPipesModule } from 'ngx-pipes';
import { NzAffixModule } from 'ng-zorro-antd/affix';
import { NzAutocompleteModule } from 'ng-zorro-antd/auto-complete';
import { NzAvatarModule } from 'ng-zorro-antd/avatar';
import { NzBreadCrumbModule } from 'ng-zorro-antd/breadcrumb';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzCardModule } from 'ng-zorro-antd/card';
import { NzCarouselModule } from 'ng-zorro-antd/carousel';
import { NzCheckboxModule } from 'ng-zorro-antd/checkbox';
import { NzCollapseModule } from 'ng-zorro-antd/collapse';
import { NzDatePickerModule } from 'ng-zorro-antd/date-picker';
import { NzDividerModule } from 'ng-zorro-antd/divider';
import { NzDrawerModule } from 'ng-zorro-antd/drawer';
import { NzDropDownModule } from 'ng-zorro-antd/dropdown';
import { NzFormModule } from 'ng-zorro-antd/form';
import { NzGridModule } from 'ng-zorro-antd/grid';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { NzInputModule } from 'ng-zorro-antd/input';
import { NzInputNumberModule } from 'ng-zorro-antd/input-number';
import { NzLayoutModule } from 'ng-zorro-antd/layout';
import { NzListModule } from 'ng-zorro-antd/list';
import { NzMenuModule } from 'ng-zorro-antd/menu';
import { NzModalModule } from 'ng-zorro-antd/modal';
import { NzPageHeaderModule } from 'ng-zorro-antd/page-header';
import { NzPopconfirmModule } from 'ng-zorro-antd/popconfirm';
import { NzPopoverModule } from 'ng-zorro-antd/popover';
import { NzSelectModule } from 'ng-zorro-antd/select';
import { NzSpaceModule } from 'ng-zorro-antd/space';
import { NzSpinModule } from 'ng-zorro-antd/spin';
import { NzStatisticModule } from 'ng-zorro-antd/statistic';
import { NzSwitchModule } from 'ng-zorro-antd/switch';
import { NzTableModule } from 'ng-zorro-antd/table';
import { NzTabsModule } from 'ng-zorro-antd/tabs';
import { NzTagModule } from 'ng-zorro-antd/tag';
import { NzToolTipModule } from 'ng-zorro-antd/tooltip';
import { NzTypographyModule } from 'ng-zorro-antd/typography';
import { SafeAny } from './models/types';
import { ScrollingModule } from '@angular/cdk/scrolling';
import { TranslatePipe } from './pipes/translate.pipe';
import localeEN from '@angular/common/locales/en';
import localeJA from '@angular/common/locales/ja';
import localeZH from '@angular/common/locales/zh';
const nzModules = [
  NzAffixModule,
  NzAutocompleteModule,
  NzAvatarModule,
  NzBreadCrumbModule,
  NzButtonModule,
  NzCardModule,
  NzCarouselModule,
  NzCheckboxModule,
  NzCollapseModule,
  NzDatePickerModule,
  NzDividerModule,
  NzDrawerModule,
  NzDropDownModule,
  NzFormModule,
  NzGridModule,
  NzIconModule,
  NzInputModule,
  NzInputNumberModule,
  NzLayoutModule,
  NzListModule,
  NzMenuModule,
  NzModalModule,
  NzPageHeaderModule,
  NzPopconfirmModule,
  NzPopoverModule,
  NzSelectModule,
  NzSpaceModule,
  NzSpinModule,
  NzStatisticModule,
  NzSwitchModule,
  NzTableModule,
  NzTabsModule,
  NzTagModule,
  NzTimePickerModule,
  NzToolTipModule,
  NzTypographyModule
];
const matModules = [A11yModule, DragDropModule, ScrollingModule, MatIconModule];
const modules = [
  ...matModules,
  ...nzModules,
  CommonModule,
  FormsModule,
  HttpClientModule,
  NgAutoAnimateDirective,
  NgPipesModule,
  ReactiveFormsModule
];
const components = [];
const directives = [] as SafeAny[];
const pipes = [TranslatePipe, ItemPipe];
registerLocaleData(localeEN);
registerLocaleData(localeJA);
registerLocaleData(localeZH);
@NgModule({
  declarations: [...components, ...directives, ...pipes],
  imports: [...modules],
  exports: [...modules, ...components, ...directives, ...pipes],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: JWTInterceptor, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true },
    {
      provide: NZ_I18N,
      useFactory: (localId: string) => {
        switch (localId) {
          case 'en':
            return en_US;
          case 'ja':
            return ja_JP;
          case 'zh':
            return zh_CN;
          default:
            return en_US;
        }
      },
      deps: [LOCALE_ID]
    }
  ]
})
export class CoreModule {}

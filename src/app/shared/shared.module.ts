import { DatePipe, DecimalPipe } from '@angular/common';
import { NgModule } from '@angular/core';
import { NzMessageService } from 'ng-zorro-antd/message';
import { SafeAny } from '../core/models/types';
import { CoreModule } from '../core/core.module';
import { CalendarModule, DateAdapter } from 'angular-calendar';
import { adapterFactory } from 'angular-calendar/date-adapters/date-fns';
import { NgZorroAntdMobileModule } from 'ng-zorro-antd-mobile';
const modules = [
  CoreModule,
  NgZorroAntdMobileModule,
  CalendarModule.forRoot({
    provide: DateAdapter,
    useFactory: adapterFactory
  })
];
const components: SafeAny[] = [];
const directives: SafeAny[] = [];
@NgModule({
  declarations: [...components, ...directives],
  imports: [...modules],
  exports: [...modules, ...components, ...directives],
  providers: [NzMessageService, DatePipe, DecimalPipe]
})
export class SharedModule {}

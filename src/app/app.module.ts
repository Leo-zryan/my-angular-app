import { APP_ID, NgModule } from '@angular/core';
import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { AppStore } from './core/stores/app.store';
import { AuthStore } from './core/stores/auth.store';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { BrowserModule } from '@angular/platform-browser';
import { environment } from 'src/environments/environment';
import { ErrorInterceptor } from './core/interceptors/error.interceptor';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { JWTInterceptor } from './core/interceptors/jwt.interceptor';
import { LoginComponent } from './components/login/login.component';
import { NgxsLoggerPluginModule } from '@ngxs/logger-plugin';
import { NgxsModule } from '@ngxs/store';
import { NgxsStoragePluginModule } from '@ngxs/storage-plugin';
import { SharedModule } from './shared/shared.module';
import { RoomCheckStore } from './features/room-check/room-check.store';
const storedStates = [AppStore.States, AuthStore.States];
const states = [...storedStates, RoomCheckStore.States];
@NgModule({
  declarations: [AppComponent, LoginComponent],
  imports: [
    NgxsModule.forRoot(states, {
      developmentMode: !environment.production
    }),
    NgxsStoragePluginModule.forRoot({
      key: storedStates,
      namespace: 'innovation-room-check'
    }),
    NgxsLoggerPluginModule.forRoot({
      disabled: environment.production
    }),
    SharedModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    BrowserModule
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: JWTInterceptor, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true },
    { provide: APP_ID, useValue: 'innovation-room-check' }
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}

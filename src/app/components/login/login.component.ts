import { ActivatedRoute } from '@angular/router';
import { AuthStore } from 'src/app/core/stores/auth.store';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { LoginModel } from 'src/app/core/models/login.model';
import { Store } from '@ngxs/store';
import { BaseComponent } from 'src/app/core/components/base.component';

@Component({
  selector: 'innovation-room-check-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.less']
})
export class LoginComponent extends BaseComponent implements OnInit, OnDestroy {
  constructor(
    private route: ActivatedRoute,
    private store: Store
  ) {
    super();
  }
  //#region fields
  returnUrl = '';
  password = '';
  //#endregion
  //#region events
  override ngOnInit(): void {
    super.ngOnInit();
    this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/';
    this.onLoginClick();
  }
  override ngOnDestroy(): void {
    super.ngOnDestroy();
  }
  onLoginClick() {
    const loginModel = {
      userName: 'user',
      password: this.password
    } as LoginModel;
    this.store.dispatch(
      new AuthStore.Actions.Login(loginModel, this.returnUrl)
    );
  }
  //#endregion
}

import { AppStore } from 'src/app/core/stores/app.store';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { Store } from '@ngxs/store';
import { BaseComponent } from 'src/app/core/components/base.component';
@Component({
  selector: 'innovation-room-check-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.less']
})
export class MainComponent extends BaseComponent implements OnInit, OnDestroy {
  constructor(private store: Store) {
    super();
  }
  //#region fields
  title = 'Room Check';
  //#endregion
  //#region properties
  //#endregion
  //#region events
  override ngOnInit() {
    super.ngOnInit();
    this.store.dispatch(new AppStore.Actions.SetTitle(this.title));
  }
  override ngOnDestroy(): void {
    super.ngOnDestroy();
  }
  //#endregion
  //#region methods
  //#endregion
}

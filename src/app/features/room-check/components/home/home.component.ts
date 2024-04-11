import { Component, OnDestroy, OnInit, ViewEncapsulation } from '@angular/core';
import { Store } from '@ngxs/store';
import { BaseComponent } from 'src/app/core/components/base.component';
import { LiteralService } from 'src/app/core/services/literal.service';
@Component({
  selector: 'innovation-room-check-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.less'],
  encapsulation: ViewEncapsulation.None
})
export class HomeComponent extends BaseComponent implements OnInit, OnDestroy {
  constructor(
    private store: Store,
    private literalService: LiteralService
  ) {
    super();
  }
  //#region fields
  //#endregion
  //#region properties
  get isLoading() {
    return false;
  }
  //#endregion
  //#region events
  override ngOnInit() {
    super.ngOnInit();
  }
  override ngOnDestroy(): void {
    super.ngOnDestroy();
  }
  //#endregion
  //#region methods
  //#endregion
}

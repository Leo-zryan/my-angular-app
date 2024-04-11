import { Component, OnInit } from '@angular/core';
import { Select, Store } from '@ngxs/store';
import { Observable } from 'rxjs';
import { AppStore } from 'src/app/core/stores/app.store';

@Component({
  selector: 'innovation-room-check-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.less']
})
export class HeaderComponent implements OnInit {
  constructor(private store: Store) {}
  //#region fields
  @Select(AppStore.Selectors.title)
  title$: Observable<string>;
  //#endregion
  //#region events
  ngOnInit(): void {}
  //#endregion
  //#region methods
  //#endregion
}

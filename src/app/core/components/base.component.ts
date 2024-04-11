import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subject } from 'rxjs';
import { Dictionary } from '../models/dictionary';

@Component({
  template: ''
})
export abstract class BaseComponent implements OnInit, OnDestroy {
  constructor() {}
  //#region fields
  destroy$: Subject<void> = new Subject<void>();
  loadingStatus: Dictionary<boolean> = {};
  //#endregion
  //#region properties
  //#endregion
  //#region events
  ngOnInit(): void {}
  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.unsubscribe();
  }
  //#endregion
  //#region methods
  //#endregion
}

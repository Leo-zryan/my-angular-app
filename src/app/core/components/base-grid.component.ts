import { BaseComponent } from './base.component';
import { BaseGridModel } from '../models/base-grid.model';
import { BaseGridStore } from './base-grid.store';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { Constants } from 'src/app/core/models/constants';
import { Dictionary } from 'src/app/core/models/dictionary';
import {
  GridDataModel,
  GridModel,
  GridSearchModel
} from '../models/grid.model';
import { Observable } from 'rxjs';
import { SafeAny } from '../models/types';
import { Select, Store } from '@ngxs/store';
import { takeUntil } from 'rxjs';
@Component({
  template: ''
})
export abstract class BaseGridComponent<
    TGridModel extends BaseGridModel,
    TGridFilterModel
  >
  extends BaseComponent
  implements OnInit, OnDestroy
{
  constructor(protected store: Store) {
    super();
  }
  //#region fields
  public grid = new GridModel<TGridModel, TGridFilterModel>();
  public isAllChecked = false;
  public isInitialized = false;
  public mapIsLoading: Dictionary<boolean> = {};
  protected mapChecked: Dictionary<boolean> = {};
  public searchPanelVisibility: Dictionary<boolean> = {};
  @Select(BaseGridStore.Selectors.getFilters) gridFilters$: Observable<SafeAny>;
  //#endregion
  //#region properties
  get hasPermissionRead() {
    return true;
  }
  get hasPermissionEdit() {
    return true;
  }
  get hasPermissionDelete() {
    return true;
  }
  get selectedItems(): TGridModel[] {
    return this.grid.rows.filter(x => this.mapChecked[x.id]);
  }
  get selectedIds(): number[] {
    return this.selectedItems.map(x => x.id);
  }
  get firstSelectedId() {
    return this.selectedIds[0];
  }
  get btnNewHidden() {
    return !this.hasPermissionEdit;
  }
  get btnNewDisabled() {
    return false;
  }
  get btnViewHidden() {
    return !this.hasPermissionRead;
  }
  get btnViewDisabled() {
    return this.selectedIds.length !== 1;
  }
  get btnEditHidden() {
    return !this.hasPermissionEdit;
  }
  get btnDeleteHidden() {
    return !this.hasPermissionDelete;
  }
  get btnDeleteDisabled() {
    return this.selectedIds.length === 0;
  }
  get btnResetCriteriaHidden() {
    return !this.hasPermissionRead;
  }
  get btnResetCriteriaDisabled() {
    return false;
  }
  get gridDataRows() {
    return this.grid.rows;
  }
  set gridData(data: GridDataModel<TGridModel>) {
    this.grid.data = data;
  }
  get gridDataTotal() {
    return this.grid.total;
  }
  get gridPageIndex() {
    return this.grid.pageIndex;
  }
  set gridPageIndex(value: number) {
    this.grid.pageIndex = value;
  }
  get gridPageSize() {
    return this.grid.pageSize;
  }
  set gridPageSize(value: number) {
    this.grid.pageSize = value;
  }
  get gridSearchParam() {
    return this.grid.searchModel;
  }
  get gridColumnWidthConfig() {
    return ['500px'];
  }
  get gridScrollX() {
    return this.gridColumnWidthConfig
      .map(x => parseInt(x, 10))
      .reduce((a, b) => a + b, 0);
  }
  get gridScrollY() {
    const fixedHeight = Constants.headerHeight + 64 * 3;
    const y = window.innerHeight - fixedHeight;
    return y;
  }
  get gridScroll() {
    return { x: `${this.gridScrollX}px`, y: `${this.gridScrollY}px` };
  }
  get gridFilter() {
    return this.grid.filterModel;
  }
  get selectedAllItemIds() {
    return Object.keys(this.mapChecked)
      .filter(x => this.mapChecked[x])
      .map(x => Number(x));
  }
  //#endregion
  //#region events
  override ngOnInit() {
    super.ngOnInit();
    this.grid.search = async () => {
      this.hideSearchPanels();
      await this.onSearch();
      this.store.dispatch(
        new BaseGridStore.Actions.SetFilter(this.grid.searchModel)
      );
      this.refreshCheckStatus();
    };
    this.gridFilters$.pipe(takeUntil(this.destroy$)).subscribe(result => {
      if (result) {
        this.grid.searchModel = { ...result };
      }
    });
  }
  override ngOnDestroy() {
    super.ngOnDestroy();
  }
  public onQueryParamsChange($event: SafeAny) {
    this.grid.onQueryParamsChange($event);
  }
  public onCheckAll(value: boolean) {
    this.grid.rows.forEach(x => (this.mapChecked[x.id] = value));
    this.refreshCheckStatus();
  }
  public onCheckItem() {
    this.refreshCheckStatus();
  }
  public onResetClick(param: keyof TGridFilterModel): void {
    this.setGridFilter(param, null, true);
  }
  protected abstract onSearch(): Promise<void>;
  //#endregion
  //#region methods
  protected clearChecked() {
    this.mapChecked = {};
    this.refreshCheckStatus();
  }
  protected refreshCheckStatus() {
    this.isAllChecked =
      this.grid.rows.length > 0 &&
      this.grid.rows.every(item => this.mapChecked[item.id]);
  }
  protected search() {
    this.grid.search();
  }
  protected setGridFilter(
    key: keyof TGridFilterModel,
    value: SafeAny,
    search: boolean = false
  ) {
    this.grid.setFilter(key, value, search);
  }
  protected setCriteria(model: GridSearchModel<TGridFilterModel>) {
    this.grid.searchModel = model;
  }
  protected resetCriteria() {
    this.grid.resetCriteria();
    this.store.dispatch(
      new BaseGridStore.Actions.SetFilter(this.grid.searchModel)
    );
  }
  protected hideSearchPanels() {
    this.searchPanelVisibility = {};
  }
  protected gridFilterHasValue(key: keyof TGridFilterModel) {
    return (
      !!this.gridFilter[key] &&
      this.gridFilter[key]['length'] &&
      this.gridFilter[key]['length'] > 0
    );
  }
  protected getSortOrder(key: string) {
    return this.grid.searchModel.sortField &&
      this.grid.searchModel.sortField === key
      ? this.grid.searchModel.sortDirection
      : null;
  }
  //#endregion
}

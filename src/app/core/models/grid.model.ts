import { NzTableQueryParams } from 'ng-zorro-antd/table';
import { BaseGridModel } from './base-grid.model';
import { SafeAny, SortDirection } from './types';

export class GridModel<TData extends BaseGridModel, TFilter> {
  search: () => void;
  data: GridDataModel<TData> = {
    data: [] as TData[],
    total: 0
  };
  private pager: GridPagerModel = {
    index: 1,
    size: 10
  };
  private sorter: GridSorterModel = {
    field: '',
    direction: null
  };
  private filter: TFilter = {} as TFilter;
  constructor() {}
  get rows() {
    return this.data.data;
  }
  get total() {
    return this.data.total;
  }
  get pageIndex() {
    return this.pager.index;
  }
  set pageIndex(value: number) {
    if (value < 1) {
      value = 1;
    }
    this.pager.index = value;
  }
  get pageSize() {
    return this.pager.size;
  }
  set pageSize(value: number) {
    if (value < 1) {
      value = 1;
    } else if (value > 100) {
      value = 100;
    }
    this.pager.size = value;
  }
  get sortField() {
    return this.sorter.field;
  }
  set sortField(value: string) {
    this.sorter.field = value;
  }
  get sortDirection() {
    return this.sorter.direction;
  }
  set sortDirection(value: SortDirection) {
    this.sorter.direction = value;
  }
  get searchModel() {
    return {
      filter: this.filter,
      pageIndex: this.pageIndex,
      pageSize: this.pageSize,
      sortField: this.sortField,
      sortDirection: this.sortDirection
    } as GridSearchModel<TFilter>;
  }
  set searchModel(value: GridSearchModel<TFilter>) {
    let needSearch = false;
    if (JSON.stringify(this.searchModel) != JSON.stringify(value)) {
      needSearch = true;
    }
    this.filter = value.filter;
    this.pageIndex = value.pageIndex;
    this.pageSize = value.pageSize;
    this.sortField = value.sortField;
    this.sortDirection = value.sortDirection;
    if (needSearch) {
      this.onSearch();
    }
  }
  get filterModel() {
    return this.filter;
  }
  set filterModel(value) {
    this.filter = value;
  }
  /**
   * For the online search usage
   * @param params NzTableQueryParams
   */
  onQueryParamsChange(params: NzTableQueryParams) {
    const currentSort = params.sort.find(item => item.value !== null);
    const criteria: GridSearchModel<TFilter> = {
      filter: this.filter,
      pageIndex: params.pageSize !== this.pageSize ? 1 : params.pageIndex,
      pageSize: params.pageSize,
      sortField: (currentSort && currentSort.key) || '',
      sortDirection: ((currentSort && currentSort.value) ||
        null) as SortDirection
    };
    this.searchModel = criteria;
  }
  onPageIndexChange() {
    this.onSearch();
  }
  onPageSizeChange() {
    this.onSearch(true);
  }
  onSortChange(sort: { key: string; value: string }) {
    this.sortField = sort.key;
    this.sortDirection = sort.value as SortDirection;
    this.onSearch();
  }
  onSearch(reset: boolean = false) {
    if (reset) {
      this.pageIndex = 1;
    }
    if (!this.search) {
      alert('search is not defined for GridModel');
    }
    this.search();
  }
  resetCriteria() {
    this.searchModel = {
      filter: {},
      pageIndex: 1,
      pageSize: 10,
      sortField: '',
      sortDirection: null
    } as GridSearchModel<TFilter>;
  }
  setFilter(key: keyof TFilter, value: SafeAny, search: boolean = false) {
    this.filter[key] = value;
    if (search) {
      this.onSearch(true);
    }
  }
}
export interface GridDataModel<TData> {
  data: TData[];
  total: number;
}
export interface GridPagerModel {
  index: number;
  size: number;
}
export interface GridSorterModel {
  field: string;
  direction: SortDirection;
}
export interface GridSearchModel<TFilter> {
  filter: TFilter;
  pageIndex: number;
  pageSize: number;
  sortField: string;
  sortDirection: SortDirection;
}

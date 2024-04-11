import {
  NzTableFilterFn,
  NzTableFilterList,
  NzTableSortFn,
  NzTableSortOrder
} from 'ng-zorro-antd/table';

export interface NzTableColumnItem<T> {
  name: string;
  width?: string;
  sortOrder?: NzTableSortOrder | null;
  sortFn?: NzTableSortFn<T> | null;
  listOfFilter?: NzTableFilterList;
  filterFn?: NzTableFilterFn<T> | null;
  filterMultiple?: boolean;
  sortDirections?: NzTableSortOrder[];
}

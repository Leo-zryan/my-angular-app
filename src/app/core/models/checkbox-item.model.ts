import { ItemModel } from './item.model';

export interface CheckboxItemModel<T> extends ItemModel<T> {
  checked: boolean;
}

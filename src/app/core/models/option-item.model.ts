import { ItemModel } from './item.model';

export interface OptionItemModel<T> extends ItemModel<T> {
  byDefault?: boolean;
}

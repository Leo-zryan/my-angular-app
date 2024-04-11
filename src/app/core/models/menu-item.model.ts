import { ItemModel } from './item.model';

export interface MenuItemModel extends ItemModel<string> {
  icon?: string;
}

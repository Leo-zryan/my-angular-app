import { CheckboxItemModel } from './checkbox-item.model';

export interface CheckboxGroupModel<T> {
  label: string;
  children: CheckboxItemModel<T>[];
}

import { CommonHelper } from 'src/app/core/helpers/common.helper';
import { Pipe, PipeTransform } from '@angular/core';
import { ItemModel } from '../models/item.model';

/*
 * Translate the value to text by OptionItem<T> array datasource
 * Usage:
 *   value | item:datasource
 * Example:
 *   {{ 1 | item:dsRequestTypes }}
 *   formats to: Change User Permission
 */
@Pipe({ name: 'item' })
export class ItemPipe implements PipeTransform {
  constructor() {}
  transform<T>(value: T, data: ItemModel<T>[]): string {
    if (data === undefined) {
      return null;
    }
    return CommonHelper.getTextFromItem(data, value);
  }
}

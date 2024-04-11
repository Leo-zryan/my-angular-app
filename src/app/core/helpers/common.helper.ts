import { SafeAny } from '../models/types';
import { OptionItemModel } from '../models/option-item.model';
import { ItemModel } from '../models/item.model';

export class CommonHelper {
  static clone<T>(obj: T): T {
    return JSON.parse(JSON.stringify(obj)) as T;
  }
  /**
   * Fill the string with the given args, a TypeScript version implementation of C# String.Format()
   * @param format string
   * @param args string[]
   */
  static format(format: string, args: string[]): string {
    return format.replace(/{(\d+)}/g, (match: string, number: number) => {
      return typeof args[number] !== 'undefined' ? args[number] : match;
    });
  }
  static downloadFile(response: SafeAny, fileName: string) {
    const href = URL.createObjectURL(response);
    const link = document.createElement('a');
    link.href = href;
    link.setAttribute('download', fileName);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(href);
  }
  static iterateEnum(e: SafeAny, patch: OptionItemModel<number>[] = []) {
    const result = Object.keys(e)
      .filter(x => isNaN(Number(x)))
      .map(key => {
        return {
          label: key,
          value: e[key]
        } as OptionItemModel<number>;
      });
    if (patch.length > 0) {
      patch.forEach(item => {
        if (result.some(x => x.value === item.value)) {
          result.find(x => x.value === item.value)!.label = item.label;
        }
      });
    }
    return result;
  }
  static transformOptionItem<T>(data: OptionItemModel<T>[], params: T[]) {
    return data.map(item => ({
      ...item,
      byDefault: params && params.includes(item.value)
    }));
  }
  static getNzTableSortOrder(allowNull: boolean) {
    const result = ['ascend', 'descend'];
    return allowNull ? [...result, null] : result;
  }
  static getTextFromItem<T>(data: ItemModel<T>[], value: T): string {
    if (!data) {
      return null;
    }
    const result = data.find(item => item.value === value);
    if (result !== undefined) {
      return result.label;
    } else {
      return null;
    }
  }
}

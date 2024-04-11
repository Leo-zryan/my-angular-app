import { Labelable } from './labelable';
import { Valuable } from './valuable';

export interface ItemModel<T> extends Labelable, Valuable<T> {}

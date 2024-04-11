import { Action, Selector, State, StateContext, StateToken } from '@ngxs/store';
import { Injectable } from '@angular/core';
import { SafeAny } from '../models/types';
export namespace BaseGridStore {
  const name = 'BaseGridStore';
  interface Model {
    filters: SafeAny;
  }
  const defaults: Model = {
    filters: null
  };
  const TOKEN = new StateToken<Model>(name);
  export namespace Actions {
    export const name = 'BaseGrid';
    export class SetFilter {
      static readonly type = `[${name}] set filter`;
      constructor(public filters: SafeAny) {}
    }
    export class ClearFilter {
      static readonly type = `[${name}] clear filter`;
      constructor() {}
    }
  }
  @State<Model>({
    name: TOKEN,
    defaults
  })
  @Injectable()
  export class States {
    constructor() {}
    @Action(Actions.SetFilter)
    SetFilter(ctx: StateContext<Model>, params: Actions.SetFilter) {
      ctx.patchState({
        filters: params.filters
      });
    }
    @Action(Actions.ClearFilter)
    ClearFilter(ctx: StateContext<Model>) {
      ctx.patchState({
        filters: null
      });
    }
  }
  export class Selectors {
    @Selector([TOKEN])
    static getFilters(state: Model) {
      return state.filters;
    }
  }
}

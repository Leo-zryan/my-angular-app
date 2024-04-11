import {
  Action,
  NgxsAfterBootstrap,
  Selector,
  State,
  StateContext,
  StateToken
} from '@ngxs/store';
import { Injectable } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { version } from 'src/environments/version';
import { VersionModel } from '../models/version.model';
export namespace AppStore {
  const name = 'AppStore';
  interface Model {
    title: string;
    version: VersionModel;
  }
  const defaults: Model = {
    title: '',
    version: null
  };
  const TOKEN = new StateToken<Model>(name);
  export namespace Actions {
    export class SetTitle {
      static readonly type = `[${name}] set title`;
      constructor(public title: string) {}
    }
    export class SetVersion {
      static readonly type = `[${name}] set version`;
      constructor() {}
    }
  }
  @State<Model>({
    name: TOKEN,
    defaults
  })
  @Injectable()
  export class States implements NgxsAfterBootstrap {
    constructor(private titleService: Title) {}
    ngxsAfterBootstrap(ctx: StateContext<Model>): void {
      ctx.dispatch(new Actions.SetVersion());
    }
    @Action(Actions.SetTitle)
    setTitle(ctx: StateContext<Model>, payload: Actions.SetTitle) {
      const title = payload.title;
      this.titleService.setTitle(title);
      ctx.patchState({
        title
      });
    }
    @Action(Actions.SetVersion)
    setVersion(ctx: StateContext<Model>) {
      ctx.patchState({
        version
      });
    }
  }
  export class Selectors {
    @Selector([TOKEN])
    static title(state: Model) {
      return state.title;
    }
    @Selector([TOKEN])
    static version(state: Model) {
      return state.version;
    }
  }
}

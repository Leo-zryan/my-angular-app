import {
  Action,
  NgxsOnInit,
  Selector,
  State,
  StateContext,
  StateToken
} from '@ngxs/store';
import { Injectable } from '@angular/core';
import { MessageService } from 'src/app/core/services/message.service';
import { LiteralService } from 'src/app/core/services/literal.service';
import { RoomCheckService } from './room-check.service';
import { MeetingRoom } from './models/meeting-room';
import { catchError, of, tap } from 'rxjs';
import { ImmutableContext } from '@ngxs-labs/immer-adapter';
import { AppStore } from 'src/app/core/stores/app.store';
import { BookMeetingParam } from './models/book-meeting-param';
import { FreeBusyStatus } from './models/free-busy-status.enum';
export namespace RoomCheckStore {
  const name = 'RoomCheckStore';
  interface Model {
    email: string;
    meetingRoom: MeetingRoom;
    durations: number[];
  }
  const defaults: Model = {
    email: '',
    meetingRoom: null,
    durations: []
  };
  const TOKEN = new StateToken<Model>(name);
  export namespace Actions {
    export class GetDuration {
      static readonly type = `[${name} get duration]`;
    }
    export class InitMeetingRoom {
      static readonly type = `[${name}] init meeting room`;
      constructor(public email: string) {}
    }
    export class GetMeetingRoom {
      static readonly type = `[${name}] get meeting room`;
      constructor() {}
    }
    export class BookMeeting {
      static readonly type = `[${name}] book meeting`;
      constructor(public param: BookMeetingParam) {}
    }
  }
  @State<Model>({
    name: TOKEN,
    defaults
  })
  @Injectable()
  export class States implements NgxsOnInit {
    constructor(
      private roomCheckService: RoomCheckService,
      private messageService: MessageService,
      private literalService: LiteralService
    ) {}
    ngxsOnInit(ctx: StateContext<Model>): void {
      ctx.dispatch(new Actions.GetDuration());
    }
    @Action(Actions.GetDuration)
    GetDuration(ctx: StateContext<Model>) {
      const durations = this.roomCheckService.getDurations();
      ctx.patchState({
        durations
      });
    }
    @Action(Actions.InitMeetingRoom)
    InitMeetingRoom(
      ctx: StateContext<Model>,
      payload: Actions.InitMeetingRoom
    ) {
      const email = payload.email.replaceAll('|', '.');
      ctx.patchState({
        email
      });
      ctx.dispatch(new Actions.GetMeetingRoom());
    }
    @Action(Actions.GetMeetingRoom)
    @ImmutableContext()
    GetMeetingRoom(ctx: StateContext<Model>) {
      const email = ctx.getState().email;
      return this.roomCheckService.getMeetingRoom(email).pipe(
        tap(meetingRoom => {
          ctx.setState((state: Model) => {
            state.meetingRoom = meetingRoom;
            return state;
          });
          ctx.dispatch(
            new AppStore.Actions.SetTitle(meetingRoom.information.name)
          );
        }),
        catchError(error => {
          this.messageService.showModalErrorModel(error);
          return of();
        })
      );
    }
    @Action(Actions.BookMeeting)
    BookMeeting(ctx: StateContext<Model>, payload: Actions.BookMeeting) {
      const email = ctx.getState().email;
      return this.roomCheckService.bookMeeting(email, payload.param).pipe(
        tap(result => {
          if (result) {
            this.messageService.showModalSuccessKey();
          } else {
            this.messageService.showModalErrorKey('Error_BookMeetingFailed');
          }
          ctx.dispatch(new Actions.GetMeetingRoom());
        }),
        catchError(error => {
          this.messageService.showModalErrorModel(error);
          return of();
        })
      );
    }
  }
  export class Selectors {
    @Selector([TOKEN])
    static meetingRoomName(state: Model) {
      return state.meetingRoom.information.name;
    }
    @Selector([TOKEN])
    static meetingRoomScheduleItems(state: Model) {
      return state.meetingRoom?.schedule?.items;
    }
    @Selector([TOKEN])
    static meetingRoomAvailableScheduleItem(state: Model) {
      return state.meetingRoom?.schedule?.availableItem;
    }
    @Selector([TOKEN])
    static meetingRoomAvailableItem(state: Model) {
      return state.meetingRoom?.schedule?.availableItem;
    }
    @Selector([TOKEN])
    static meetingRoomIsAvailable(state: Model) {
      return (
        state.meetingRoom?.schedule?.availableItem.status ===
        FreeBusyStatus.Free
      );
    }
    @Selector([TOKEN])
    static durations(state: Model) {
      return state.durations;
    }
  }
}

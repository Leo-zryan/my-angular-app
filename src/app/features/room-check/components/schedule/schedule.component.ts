import {
  AfterViewInit,
  Component,
  ElementRef,
  Inject,
  LOCALE_ID,
  OnDestroy,
  OnInit,
  ViewChild,
  ViewEncapsulation
} from '@angular/core';
import { Select, Store } from '@ngxs/store';
import { RoomCheckStore } from '../../room-check.store';
import { BaseComponent } from 'src/app/core/components/base.component';
import { LiteralService } from 'src/app/core/services/literal.service';
import { CalendarEvent } from 'angular-calendar';
import {
  startOfDay,
  differenceInMinutes,
  startOfHour,
  addHours
} from 'date-fns';
import { ActivatedRoute } from '@angular/router';
import { Observable, filter, takeUntil } from 'rxjs';
import { formatDate } from '@angular/common';
import { NzDrawerService } from 'ng-zorro-antd/drawer';
import { BookMeetingComponent } from '../book-meeting/book-meeting.component';
import { BookMeetingParam } from '../../models/book-meeting-param';
@Component({
  selector: 'innovation-room-check-schedule',
  templateUrl: './schedule.component.html',
  styleUrls: ['./schedule.component.less'],
  encapsulation: ViewEncapsulation.None
})
export class ScheduleComponent
  extends BaseComponent
  implements OnInit, OnDestroy, AfterViewInit
{
  constructor(
    private store: Store,
    private route: ActivatedRoute,
    private literalService: LiteralService,
    private drawerService: NzDrawerService,
    @Inject(LOCALE_ID) private locale: string
  ) {
    super();
  }
  //#region fields
  @ViewChild('scrollContainer') scrollContainer: ElementRef<HTMLElement>;
  viewDate: Date = new Date();
  dayStartHour = 8;
  dayEndHour = 17;
  bookMeetingDrawerHeight = 300;
  events: CalendarEvent[] = [];
  @Select(RoomCheckStore.Selectors.meetingRoomIsAvailable)
  meetingRoomIsAvailable$: Observable<boolean>;
  //#endregion
  //#region properties
  get isLoading() {
    return this.loadingStatus['loading'];
  }
  //#endregion
  //#region events
  override ngOnInit() {
    super.ngOnInit();
    this.initDataSource();
    this.route.paramMap.pipe(takeUntil(this.destroy$)).subscribe(params => {
      const email = params.get('email');
      this.loadingStatus['loading'] = true;
      this.store
        .dispatch([new RoomCheckStore.Actions.InitMeetingRoom(email)])
        .subscribe(() => {
          this.loadingStatus['loading'] = false;
        });
    });
  }
  override ngOnDestroy(): void {
    super.ngOnDestroy();
  }
  ngAfterViewInit(): void {
    this.scrollToCurrentView();
  }
  onBookClick() {
    this.scrollToCurrentView();
    const drawer = this.drawerService.create<
      BookMeetingComponent,
      null,
      BookMeetingParam
    >({
      nzTitle: this.literalService.translate('BookMeeting'),
      nzFooter: null,
      nzExtra: null,
      nzPlacement: 'bottom',
      nzContent: BookMeetingComponent,
      nzHeight: this.bookMeetingDrawerHeight
    });
    drawer.afterClose.subscribe(param => {
      if (param) {
        this.loadingStatus['loading'] = true;
        this.store
          .dispatch(new RoomCheckStore.Actions.BookMeeting(param))
          .subscribe(() => {
            this.loadingStatus['loading'] = false;
          });
      }
    });
  }
  onSuggestionClick() {
    alert(
      'not implemented yet, this function could give the suggestion for an available meeting room which is the most nearest.'
    );
  }
  onSyncClick() {
    this.loadingStatus['loading'] = true;
    this.store
      .dispatch([new RoomCheckStore.Actions.GetMeetingRoom()])
      .subscribe(() => {
        this.loadingStatus['loading'] = false;
        this.scrollToCurrentView();
      });
  }
  //#endregion
  //#region methods
  private scrollToCurrentView() {
    // each hour is 60px high, so to get the pixels to scroll it's just the amount of minutes since midnight
    const minutesSinceStartOfDay = differenceInMinutes(
      startOfHour(new Date()),
      addHours(startOfDay(new Date()), this.dayStartHour)
    );
    this.scrollContainer.nativeElement.scrollTop = minutesSinceStartOfDay;
  }
  initDataSource() {
    this.store
      .select(RoomCheckStore.Selectors.meetingRoomScheduleItems)
      .pipe(
        takeUntil(this.destroy$),
        filter(x => !!x)
      )
      .subscribe(meetingRoomScheduleItems => {
        this.events = meetingRoomScheduleItems.map(x => {
          return {
            start: new Date(x.startTime),
            end: new Date(x.endTime),
            title: `<b>${formatDate(x.startTime, 'h:mm a', this.locale)}</b>\t${
              x.subject
            }`
          };
        });
      });
  }
  //#endregion
}

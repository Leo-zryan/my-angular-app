import { Component, OnInit } from '@angular/core';
import { Select, Store } from '@ngxs/store';
import { NzDrawerRef } from 'ng-zorro-antd/drawer';
import { Observable } from 'rxjs';
import { RoomCheckStore } from '../../room-check.store';
import { addMinutes, format, getMinutes, setMinutes } from 'date-fns';
import { BookMeetingParam } from '../../models/book-meeting-param';
import { SafeAny } from 'src/app/core/models/types';
import { MessageService } from 'src/app/core/services/message.service';
import { LiteralService } from 'src/app/core/services/literal.service';
import { CommonHelper } from 'src/app/core/helpers/common.helper';

@Component({
  selector: 'innovation-room-check-book-meeting',
  templateUrl: './book-meeting.component.html',
  styleUrl: './book-meeting.component.less'
})
export class BookMeetingComponent implements OnInit {
  constructor(
    private messageService: MessageService,
    private literalService: LiteralService,
    private drawerRef: NzDrawerRef<string>,
    private store: Store
  ) {}
  ngOnInit(): void {
    this.initDataSource();
    const date = new Date();
    const minutes = Math.floor(getMinutes(date) / 15) * 15;
    this.startTime = setMinutes(date, minutes);
    this.duration = 15;
    this.calculateEndTime();
  }
  //#region fields
  /**
   * Should be date, but the type declared in DatePicker is wrong, so we have to use SafeAny
   */
  minTime: SafeAny;
  /**
   * Should be date, but the type declared in DatePicker is wrong, so we have to use SafeAny
   */
  maxTime: SafeAny;
  startTime: Date;
  endTime: Date;
  duration: number;
  @Select(RoomCheckStore.Selectors.durations)
  dsDurations: Observable<number[]>;
  //#endregion
  //#region properties
  //#endregion
  //#region events
  onStartTimeOk() {
    this.calculateEndTime();
  }
  onDurationChange() {
    this.calculateEndTime();
  }
  onSubmitClick(): void {
    if (!this.validate()) {
      const message = CommonHelper.format(
        this.literalService.translate('Error_BookMeetingParamInvalid'),
        [format(this.minTime, 'HH:mm'), format(this.maxTime, 'HH:mm')]
      );
      this.messageService.showModalError(message);
      return;
    }
    const param: BookMeetingParam = {
      startTime: this.startTime,
      endTime: this.endTime
    };
    this.drawerRef.close(param);
  }
  //#endregion
  //#region methods
  initDataSource() {
    this.store
      .select(RoomCheckStore.Selectors.meetingRoomAvailableItem)
      .subscribe(meetingRoomAvailableItem => {
        this.minTime = new Date(meetingRoomAvailableItem.startTime);
        this.maxTime = new Date(meetingRoomAvailableItem.endTime);
      });
  }
  formatDateTime(date: Date): string {
    return format(date, 'HH:mm');
  }
  formatNumber(value: number) {
    return `${value}`;
  }
  calculateEndTime() {
    this.endTime = addMinutes(this.startTime, this.duration);
  }
  validate(): boolean {
    if (this.startTime < this.minTime || this.startTime > this.maxTime) {
      return false;
    } else if (this.endTime < this.minTime || this.endTime > this.maxTime) {
      return false;
    } else if (this.startTime >= this.endTime) {
      return false;
    }
    return true;
  }
  //#endregion
}

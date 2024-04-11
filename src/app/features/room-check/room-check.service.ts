import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { WebApiService } from 'src/app/core/services/web-api.service';
import { MeetingRoom } from './models/meeting-room';
import { BookMeetingParam } from './models/book-meeting-param';

@Injectable({ providedIn: 'root' })
export class RoomCheckService extends WebApiService {
  constructor(protected override http: HttpClient) {
    super(http);
  }
  private controllers = {
    MeetingRoom: 'MeetingRoom'
  };
  getDurations() {
    const result: number[] = [15, 30, 45, 60];
    return result;
  }
  getMeetingRoom(email: string) {
    const url = `${this.controllers.MeetingRoom}/${email}`;
    return this.get<MeetingRoom>(url);
  }
  bookMeeting(email: string, param: BookMeetingParam) {
    const url = `${this.controllers.MeetingRoom}/${email}/BookMeeting`;
    return this.post<boolean>(url, param);
  }
}

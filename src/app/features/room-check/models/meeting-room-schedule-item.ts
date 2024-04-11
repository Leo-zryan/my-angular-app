import { FreeBusyStatus } from './free-busy-status.enum';

export interface MeetingRoomScheduleItem {
  subject: string;
  status: FreeBusyStatus;
  startTime: Date;
  endTime: Date;
}

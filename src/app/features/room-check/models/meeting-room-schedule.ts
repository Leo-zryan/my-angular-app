import { MeetingRoomScheduleItem } from './meeting-room-schedule-item';

export interface MeetingRoomSchedule {
  items: MeetingRoomScheduleItem[];
  availableItem: MeetingRoomScheduleItem;
}

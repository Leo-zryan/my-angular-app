import { MeetingRoomInformation } from './meeting-room-information';
import { MeetingRoomLocation } from './meeting-room-location';
import { MeetingRoomSchedule } from './meeting-room-schedule';

export interface MeetingRoom {
  information: MeetingRoomInformation;
  location: MeetingRoomLocation;
  schedule: MeetingRoomSchedule;
  email: string;
}

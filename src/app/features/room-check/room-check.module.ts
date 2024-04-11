import { NgModule } from '@angular/core';
import { SharedModule } from 'src/app/shared/shared.module';
import { HeaderComponent } from './components/header/header.component';
import { MainComponent } from './components/main/main.component';
import { HomeComponent } from './components/home/home.component';
import { RoomCheckRoutingModule } from './room-check-routing.module';
import { ScheduleComponent } from './components/schedule/schedule.component';
import { BookMeetingComponent } from './components/book-meeting/book-meeting.component';

@NgModule({
  declarations: [
    MainComponent,
    HeaderComponent,
    HomeComponent,
    ScheduleComponent,
    BookMeetingComponent
  ],
  imports: [RoomCheckRoutingModule, SharedModule],
  exports: [],
  providers: []
})
export class RoomCheckModule {}

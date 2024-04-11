import { AuthGuard } from 'src/app/core/guards/auth.guard';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MainComponent } from './components/main/main.component';
import { HomeComponent } from './components/home/home.component';
import { ScheduleComponent } from './components/schedule/schedule.component';
const routes: Routes = [
  {
    path: '',
    component: MainComponent,
    canActivate: [AuthGuard],
    children: [
      // {
      //   path: '',
      //   redirectTo: 'schedule',
      //   pathMatch: 'full'
      // },
      {
        path: '',
        redirectTo: 'schedule/room|mars%40udtrucks|com',
        pathMatch: 'full'
      },
      {
        path: 'mars',
        redirectTo: 'schedule/room|mars%40udtrucks|com',
        pathMatch: 'full'
      },
      {
        path: 'saturn',
        redirectTo: 'schedule/room|saturn%40udtrucks|com',
        pathMatch: 'full'
      },
      {
        path: 'schedule',
        component: HomeComponent,
        canActivate: [AuthGuard]
      },
      {
        path: 'schedule/:email',
        component: ScheduleComponent,
        canActivate: [AuthGuard]
      }
    ]
  }
];
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class RoomCheckRoutingModule {
  constructor() {}
}

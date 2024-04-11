import { AuthGuard } from './core/guards/auth.guard';
import { environment } from 'src/environments/environment';
import { LoginComponent } from './components/login/login.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
const routes: Routes = [
  { path: 'login', component: LoginComponent },
  {
    path: '',
    loadChildren: () =>
      import('./features/room-check/room-check.module').then(
        m => m.RoomCheckModule
      ),
    canActivate: [AuthGuard],
    data: {}
  },
  { path: '**', redirectTo: '' }
];
@NgModule({
  imports: [
    RouterModule.forRoot(routes, {
      enableTracing: !environment.production && false
    })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}

import { NgModule }             from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ChatComponent } from './chat/chat.component';
import { UserRegistrationComponent } from './user-registration/user-registration.component';
import { RoomsComponent } from './room/room.component';

const routes: Routes = [
  { path: '', redirectTo: '/registration', pathMatch: 'full' },
  { path: 'chat', component: ChatComponent },
  { path: 'registration', component: UserRegistrationComponent },
  { path: 'rooms', component: RoomsComponent}
];

@NgModule({
  imports: [ RouterModule.forRoot(routes) ],
  exports: [ RouterModule ]
})
export class AppRoutingModule {}

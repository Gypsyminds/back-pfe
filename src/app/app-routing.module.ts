import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { RegisterComponent } from './register/register.component';
import { LoginComponent } from './login/login.component';
import { HomeComponent } from './home/home.component';
import { ProfileComponent } from './profile/profile.component';
import { BoardUserComponent } from './board-user/board-user.component';
import { BoardModeratorComponent } from './board-moderator/board-moderator.component';
import { BoardAdminComponent } from './board-admin/board-admin.component';
import { InscriptionComponent } from './inscription/inscription.component';
import { CoursesComponent } from './courses/courses.component';
import { PassageTestComponent } from './passage-test/passage-test.component';
import { DetailCourComponent } from './detail-cour/detail-cour.component';

const routes: Routes = [
  { path: 'home', component: HomeComponent },
  { path: '', component: HomeComponent },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'profile', component: ProfileComponent },
  { path: 'user', component: BoardUserComponent },
  { path: 'mod', component: BoardModeratorComponent },
  { path: 'admin', component: BoardAdminComponent },
  {  path:'inscription', component: InscriptionComponent},
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path:'course',component:CoursesComponent},
  { path:'passagedetest',component:PassageTestComponent},
  { path:'detail-cour',component:DetailCourComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

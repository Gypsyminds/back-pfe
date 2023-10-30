
import { CommonModule } from '@angular/common';  
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { HomeComponent } from './home/home.component';
import { ProfileComponent } from './profile/profile.component';
import { BoardAdminComponent } from './board-admin/board-admin.component';
import { BoardModeratorComponent } from './board-moderator/board-moderator.component';
import { BoardUserComponent } from './board-user/board-user.component';

import { authInterceptorProviders } from './_helpers/auth.interceptor';
import { InscriptionComponent } from './inscription/inscription.component';
import { DetailCourComponent } from './detail-cour/detail-cour.component';
import { PassageComponent } from './passage/passage.component';
import { CoursesComponent } from './courses/courses.component';
import { FormGroup, FormControl } from '@angular/forms';
import { NgxYoutubePlayerModule } from 'ngx-youtube-player';
import { RefacialeComponent } from './refaciale/refaciale.component';
import { Ng2TelInputModule } from 'ng2-tel-input';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegisterComponent,
    HomeComponent,
    ProfileComponent,
    BoardAdminComponent,
    BoardModeratorComponent,
    BoardUserComponent,
    InscriptionComponent,
    DetailCourComponent,
    PassageComponent,
    CoursesComponent,
    RefacialeComponent
    
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    CommonModule,
    ReactiveFormsModule,
    Ng2TelInputModule,  
    
  
    
  ],
  providers: [authInterceptorProviders],
  bootstrap: [AppComponent]
})
export class AppModule { }

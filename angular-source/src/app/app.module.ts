import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import{FormsModule} from '@angular/forms';
import{HttpModule} from '@angular/http';
import{RouterModule,Routes} from '@angular/router'

import { AppComponent } from './app.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { HomeComponent } from './components/home/home.component';
import { ProfileComponent } from './components/profile/profile.component';

import { JelovnikComponent } from './components/jelovnik/jelovnik.component';

import { ValidateService } from './services/validate.service';
import { FlashMessagesModule, FlashMessagesService } from 'angular2-flash-messages';
import { AuthService } from './services/auth.service';
import { JelovnikService } from './services/jelovnik.service';
import { PorudzbinaService } from './services/porudzbina.service';


import {AuthGuard} from './zastita/auth.guard';
import { ListaComponent } from './components/lista/lista.component';
import { DetaljiOStavciComponent } from './components/detalji-ostavci/detalji-ostavci.component';
import { PorudzbineComponent } from './components/porudzbine/porudzbine.component';


//objekat sa svim nasim rutama
const appRoutes: Routes=[
  {path:'', component: HomeComponent},
  {path:'register', component: RegisterComponent},
  {path:'login', component: LoginComponent},
  {path:'profile', component: ProfileComponent, canActivate:[AuthGuard]},
  {path:'jelovnik', component: JelovnikComponent},
  {path:'porudzbine', component:PorudzbineComponent,  canActivate:[AuthGuard]}
    
];

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    LoginComponent,
    RegisterComponent,
    HomeComponent,
    ProfileComponent,
    JelovnikComponent,
    ListaComponent,
    DetaljiOStavciComponent,
    PorudzbineComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    RouterModule.forRoot(appRoutes),
    FlashMessagesModule
  ],
  //ubacujemo servise
  providers: [
    ValidateService,
    FlashMessagesService,
    AuthService,
    AuthGuard,
    PorudzbinaService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }

import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppComponent } from './app.component';
import { AngularFireModule } from 'angularfire2';
import { LoginPageComponent } from './login-page/login-page.component';
import {RouterModule, Routes} from '@angular/router';
import {AF} from '../providers/af';
import { HomePageComponent } from './home-page/home-page.component';
import {FormsModule} from '@angular/forms';
import { RegistrationPageComponent } from './registration-page/registration-page.component';
import { ProfilePageComponent } from './profile-page/profile-page.component';
import { AgmCoreModule } from 'angular2-google-maps/core';


export const firebaseConfig = {
  apiKey: '',
  authDomain: 'rotcfit-33ec0.firebaseapp.com',
  databaseURL: 'https://rotcfit-33ec0.firebaseio.com',
  storageBucket: 'rotcfit-33ec0.appspot.com',
  messagingSenderId: '21604736537'
};

const googleMapsCore = AgmCoreModule.forRoot({
  apiKey : '',
});

const routes: Routes = [
  { path: '', component: HomePageComponent },
  { path: 'login', component: LoginPageComponent },
  { path: 'register', component: RegistrationPageComponent},
  { path: 'profile', component: ProfilePageComponent}
];

@NgModule({
  imports: [
    BrowserModule,
    AngularFireModule.initializeApp(firebaseConfig),
    RouterModule.forRoot(routes),
    FormsModule,
    googleMapsCore,
  ],
  declarations: [ AppComponent, LoginPageComponent, HomePageComponent, RegistrationPageComponent, ProfilePageComponent ],
  bootstrap: [ AppComponent ],
  providers: [AF]
})
export class AppModule {}

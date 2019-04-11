import { Component } from '@angular/core';
import { AF } from '../providers/af';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  public isLoggedIn: boolean;
  public isAdmin: boolean;
  toggleMenu = false;


  constructor(public afService: AF, private router: Router) {
    this.isAdmin = false;

    // find out if the current user is logged in successfully and if they are admins
    this.afService.af.auth.subscribe(
      (auth) => {
        if (auth == null) {
          console.log('Not Logged in.');

          this.isLoggedIn = false;
          this.router.navigate(['login']);
        } else {
          console.log('Successfully Logged in.');
          this.afService.email = auth.auth.email;
          if (this.afService.email === 'admin@admin.com'){
            this.isAdmin = true;
          }
          this.isLoggedIn = true;
          this.router.navigate(['']);
        }
      }
    );
  }

  // toggles html responsive drop down menu for small screens
  onToggleMenu(){
    if (this.toggleMenu === true) {
      this.toggleMenu = false;
    } else {
      this.toggleMenu = true;
    }
  }


  // logs the user out

  logout() {
    this.afService.logout();
  }
}

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
  toggleMenu = false;
  constructor(public afService: AF, private router: Router) {

    this.afService.af.auth.subscribe(
      (auth) => {
        if (auth == null) {
          console.log('Not Logged in.');

          this.isLoggedIn = false;
          this.router.navigate(['login']);
        } else {
          console.log('Successfully Logged in.');
          this.afService.email = auth.auth.email;
          this.isLoggedIn = true;
          this.router.navigate(['']);
        }
      }
    );
  }

  onToggleMenu(){
    if (this.toggleMenu === true) {
      this.toggleMenu = false;
    } else {
      this.toggleMenu = true;
    }
  }

  logout() {
    this.afService.logout();
  }
}

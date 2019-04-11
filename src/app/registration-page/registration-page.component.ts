import { Component } from '@angular/core';
import {AF} from '../../providers/af';
import {Router} from '@angular/router';

@Component({
  selector: 'app-registration-page',
  templateUrl: './registration-page.component.html',
  styleUrls: ['./registration-page.component.css']
})
export class RegistrationPageComponent {
  public error: any;
  public date: any;
  constructor(private afService: AF, private router: Router) {

  }

  register(event, name, email, password, year) {
    event.preventDefault();
    this.afService.registerUser(email, password).then((user) => {
      this.afService.saveUserInfoFromForm(user.uid, name, email, year).then(() => {
          this.date = new Date(0);
          this.afService.logFikeFromButton(user.uid, 1400000000000);
          this.afService.postValidWorkout(user.uid, 1400000000000);
          this.afService.logout();
        // this.router.navigate(['']);
      })
        .catch((error) => {
          this.error = error;
        });
    })
      .catch((error) => {
        this.error = error;
        console.log(this.error);
      });
  }
}


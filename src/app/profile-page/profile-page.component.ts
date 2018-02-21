import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';
import {AF} from '../../providers/af';

@Component({
  selector: 'app-profile-page',
  templateUrl: './profile-page.component.html',
  styleUrls: ['./profile-page.component.css']
})
export class ProfilePageComponent implements OnInit {

  currentUser: any;
  private email: string;
  geoLogs: any;

  constructor(private afService: AF, private router: Router) { }

  ngOnInit() {
    this.email = this.afService.email;
    this.afService.findUserByEmail(this.email).subscribe(
      val => {
        console.log(val);
        this.currentUser = val[0];
        this.geoLogs = JSON.stringify(this.currentUser.checkIns);
      }
    );
  }
}

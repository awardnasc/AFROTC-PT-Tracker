import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';
import {AF} from '../../providers/af';
import * as moment from 'moment';

@Component({
  selector: 'app-profile-page',
  templateUrl: './profile-page.component.html',
  styleUrls: ['./profile-page.component.css']
})

export class ProfilePageComponent implements OnInit {

  currentUser: any;
  private email: string;
  geoLogs: any;
  parsedGeo: any;

  constructor(private afService: AF, private router: Router) { }

  // Check if user is admin if not parse the fike logs for the current user
  ngOnInit() {
      this.email = this.afService.email;
      if (this.email !== 'admin@admin.com') {
      this.afService.findUserByEmail(this.email).subscribe(
          val => {
              console.log(val);
              this.currentUser = val[0];
              this.geoLogs = JSON.stringify(this.currentUser.fike);
              this.parsedGeo = this.geoLogs.replace(/[{}]/g, '');
              this.parsedGeo = this.parsedGeo.replace(/"(.*?)"/g, '');
              this.parsedGeo = this.parsedGeo.replace(/[:]/g, '');
              this.parsedGeo = JSON.parse('[' + this.parsedGeo + ']');
              this.timeConverter();
              this.parsedGeo = this.parsedGeo.reverse();
          }
      );
  }
  }

  // Convert unix time stamp to easily readable format
  timeConverter() {
      let i;
      for (i = 0; i < this.parsedGeo.length; i++) {
        let t = new Date(this.parsedGeo[i]);
        this.parsedGeo[i] = t;
      }
  }
}

import {Component, OnInit, AfterViewChecked, ElementRef, ViewChild} from '@angular/core';
import {AF} from '../../providers/af';
import {FirebaseListObservable} from 'angularfire2';
import {Router} from '@angular/router';

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.css']
})
export class HomePageComponent {

  public position: any;
  public latitude: number;
  public longitude: number;
  lat = 34.676589;
  lng = -82.836585;

  constructor() {}

  public getLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((pos) => {
        this.position = pos;
        this.latitude = this.position.coords.latitude;
        this.longitude = this.position.coords.longitude;

        console.log(pos);
        console.log(this.lat, '  ', this.longitude);
      });
    } else {
      console.log('not supported');
      this.position = 'Geolocation is not supported by this browser.';
    }
  }
}


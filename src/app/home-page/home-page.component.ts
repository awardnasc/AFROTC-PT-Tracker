import {Component, OnInit, AfterViewChecked, ElementRef, ViewChild} from '@angular/core';
import {AF} from '../../providers/af';
import {FirebaseListObservable} from 'angularfire2';
import {Router} from '@angular/router';
import 'rxjs/add/operator/do';
import * as moment from 'moment';


@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.css']
})
export class HomePageComponent implements OnInit{

  public allUserList: any;
  public position: any;
  public latitude: number;
  public longitude: number;

  currentUser: any;
  private email: string;
  public isAdmin: boolean;

  public geoLogs: any;
  public parsedGeo: any;
  public parsedGeo2: any;

  public currentCheckUserName: any;
  public trueUserName: any = [];
  public trueUserLog: any = [];
  public falseUserName: any = [];
  public falseUserLog: any = [];

  public validWorkout: any = false;

  public userSub: any;
  public stopSub: any;
  public canStopSub: any;
  public profileSub: any;

  public buttonSwitch: any;

  public workoutPost = '';

  public getWorkout: any;
  public buildTable = true;

  public profileName: any;
  public profileEmail: any;
  public profileUser: any;
  public geoLogsPro: any;
  public parsedGeoPro: any;


  constructor(private afService: AF) {
    this.isAdmin = false;
      if (this.afService.email === 'admin@admin.com') {
          this.isAdmin = true;
      }
      this.afService.findUserByEmail('admin@admin.com').subscribe(
          val => {
              console.log(val);
              this.getWorkout = JSON.stringify(val[0].workout);
              console.log(this.getWorkout);
          }
      );
  }

  ngOnInit() {
  this.workoutPost = '';

    this.email = this.afService.email;
      this.getLocation();
      this.afService.findUserByEmail(this.email).subscribe(
          val => {
              this.currentUser = val;
          }
      );
          this.userSub = this.afService.findAllUserList().subscribe(
              val => {
                  for (let i = 0; i < val.length; i++) {
                      this.currentCheckUserName = val[i];
                      if (this.currentCheckUserName.email !== 'admin@admin.com') {
                          // get a most the most recent valid log in Date format
                          this.geoLogs = JSON.stringify(this.currentCheckUserName.fike);
                          this.parsedGeo = this.geoLogs.replace(/[{}]/g, '');
                          this.parsedGeo = this.parsedGeo.replace(/"(.*?)"/g, '');
                          this.parsedGeo = this.parsedGeo.replace(/[:]/g, '');
                          this.parsedGeo = JSON.parse('[' + this.parsedGeo + ']');
                          this.timeConverter();
                          this.parsedGeo = this.parsedGeo.reverse();
                          if (this.checkCurrentWeek(this.parsedGeo[0])) {
                              console.log('build admin list');
                              if (this.parsedGeo[0] == null || this.parsedGeo[0] === new Date(1500000000000)) {
                                  this.falseUserName.push(this.currentCheckUserName.email);
                                  // this.allUserList.push(this.currentCheckUserName.email);
                                  this.falseUserLog.push('No Logs!');
                              } else {
                                  this.trueUserName.push(this.currentCheckUserName.email);
                                  // this.allUserList.push(this.currentCheckUserName.email);
                                  this.trueUserLog.push(this.parsedGeo[0]);
                              }

                          } else {
                              // this.allUserList.push(this.currentCheckUserName.email);
                              this.falseUserName.push(this.currentCheckUserName.email);
                              this.falseUserLog.push(this.parsedGeo[0]);
                          }
                      }
                  }
                  this.userSub.unsubscribe();
              }
          );



      let currentTime = (new Date).getTime();
      let threeHour = 60 * 60 * 1000 * 3; /* ms */
      if (this.afService.findUserByEmail(this.afService.email)) {
          this.canStopSub = this.afService.findAllUserList().subscribe(
              val => {
                  for (let i = 0; i < val.length; i++) {
                      this.currentCheckUserName = val[i];
                      if (this.currentCheckUserName.email === this.afService.email
                            && this.currentCheckUserName.email !== 'admin@admin.com') {
                          this.geoLogs = JSON.stringify(this.currentCheckUserName.validWorkout);
                          console.log(this.geoLogs);
                          this.parsedGeo = this.geoLogs.replace(/[{}]/g, '');
                          this.parsedGeo = this.parsedGeo.replace(/"(.*?)"/g, '');
                          this.parsedGeo = this.parsedGeo.replace(/[:]/g, '');
                          this.parsedGeo = JSON.parse('[' + this.parsedGeo + ']');
                          // this.timeConverter();
                          this.parsedGeo = this.parsedGeo.reverse();
                          console.log(this.parsedGeo[0]);
                          console.log(currentTime);
                          console.log('last work - current time = ' + (currentTime - this.parsedGeo[0])  );
                          if ((currentTime - this.parsedGeo[0]) <= threeHour) {
                              console.log('within 3 hours');
                              this.buttonSwitch = false
                              ;
                          } else {
                              this.buttonSwitch = true;
                          }
                      }
                  }
                  this.canStopSub.unsubscribe();
              }
          );
      }
  }

  //checks users current location
  public getLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((pos) => {
        this.position = pos;
        this.latitude = this.position.coords.latitude;
        this.longitude = this.position.coords.longitude;
        });
    } else {
      this.position = 'Geolocation is not supported by this browser.';
    }
  }

  //verifies the users coordinates are in any specified workout location
  //logs location
  public logLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((pos) => {
        this.position = pos;
        this.latitude = this.position.coords.latitude;
        this.longitude = this.position.coords.longitude;

        if (this.latitude >= 34.67947306 && this.latitude <= 34.68190006) {
            if (this.longitude >= -82.842873 && this.longitude <= -82.840943) {
                this.afService.logFikeFromButton(this.currentUser.$key, Date.now());
                alert('Workout start location is valid and logged.');
                this.buttonSwitch = false;

            }
          } else {
            alert('Workout start location is not valid and was not logged.');
          }


        if (this.latitude >= 34.6800635 && this.latitude <= 34.6824905) {
            if (this.longitude >= -82.844996 && this.longitude <= -82.843066) {
                this.afService.logFikeFromButton(this.currentUser.$key, Date.now());
                alert('Workout start location is valid and logged.');
                this.buttonSwitch = false;
            }

        } else {
            alert('Workout start location is not valid and was not logged.');
        }
      });
    } else {
      console.log('not supported');
      this.position = 'Geolocation is not supported by this browser.';
    }
  }
    //checks if user is in same location as start workout
    //if valid, stops the workout and logs times
    public StopWorkout() {
        console.log('Stop Workout hit');
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition((pos) => {
                this.position = pos;
                this.latitude = this.position.coords.latitude;
                this.longitude = this.position.coords.longitude;

                if (this.latitude >= 34.67947306 && this.latitude <= 34.68190006) {
                    if (this.longitude >= -82.842873 && this.longitude <= -82.840943) {
                        this.validateStop();
                    }
                } else {
                    alert('Workout stop location is not valid and was not logged.');
                }

                if (this.latitude >= 34.6800635 && this.latitude <= 34.6824905) {
                    if (this.longitude >= -82.844996 && this.longitude <= -82.843066) {
                        this.validateStop();
                    }
                } else {
                    alert('Workout stop location is not valid and was not logged.');
                }
            });
        } else {
            console.log('not supported');
            this.position = 'Geolocation is not supported by this browser.';
        }
  }

  public validateStop() {
  // compare current time to users most recent log.
  // if within three hours log validWorkout(startTime/endTime)
    let currentTime = (new Date).getTime();
    let threeHour = 60 * 60 * 1000 * 3; /* ms */
    let oneHour = 60 * 60 * 1000 * 1; /* ms */
    this.validWorkout = true;
    console.log(this.afService.email);
    if (this.afService.findUserByEmail(this.afService.email) && this.afService.email !== 'admin@admin.com') {
        this.stopSub = this.afService.findAllUserList().subscribe(
            val => {
                for (let i = 0; i < val.length; i++) {
                    this.currentCheckUserName = val[i];
                    if (this.currentCheckUserName.email === this.afService.email) {
                        this.geoLogs = JSON.stringify(this.currentCheckUserName.fike);
                        this.parsedGeo2 = this.geoLogs.replace(/[{}]/g, '');
                        this.parsedGeo2 = this.parsedGeo2.replace(/"(.*?)"/g, '');
                        this.parsedGeo2 = this.parsedGeo2.replace(/[:]/g, '');
                        this.parsedGeo2 = JSON.parse('[' + this.parsedGeo2 + ']');
                        // this.timeConverter();
                        this.parsedGeo2 = this.parsedGeo2.reverse();
                        console.log(this.parsedGeo2[0]);
                        console.log(currentTime);
                        console.log('last work - current time = ' + (currentTime - this.parsedGeo2[0])  );
                        if ((currentTime - this.parsedGeo2[0]) <= threeHour && (currentTime - this.parsedGeo2[0]) >= oneHour) {
                            console.log('within 3 hours');
                            // if(this.validWorkout === true) { // does not work never validates
                            //     console.log('validate true stop');
                                this.afService.postValidWorkout(this.currentUser.$key, this.parsedGeo2[0]);
                                this.buttonSwitch = true;
                                alert('Workout is valid and has been logged');
                            // }
                        } else if ((currentTime - this.parsedGeo2[0]) <= oneHour) {
                            console.log('less than 1 hour');
                            alert('Workout not valid because it is shorter than 1 hour');
                        } else {
                            console.log('greater than 3 hours');
                            alert('Workout not valid because it is longer than 3 hours');
                        }
                    }
                }
                this.stopSub.unsubscribe();
            }
        );
    }
    this.validWorkout = false;
  }

    // Convert unix time stamp to easily readable format
    timeConverter() {
        let i;
        for (i = 0; i < this.parsedGeo.length; i++) {
            let t = new Date(this.parsedGeo[i]);
            this.parsedGeo[i] = t;
        }
    }
    //Verifies that the workouts are in the current week
    checkCurrentWeek(mostRecentLog: any) {
        let myMoment: moment.Moment = moment(mostRecentLog);
        let now = moment();
        return (now.isoWeek() === myMoment.isoWeek());
    }
    //allows admins to successfully post workouts
    postWorkout() {
        this.userSub.unsubscribe();
        if (this.workoutPost != null) {
            this.afService.postWorkout('P55By9sK4yb30UGs1x0wpwry1403', this.workoutPost);
            alert('Workout: "' + this.workoutPost + '" has been posted!');
        } else {
            console.log('workout null');
        }

    }

    //admins can delete the previously posted workout
    deleteWorkout() {
        this.buildTable = false;
        this.workoutPost = '';
      this.afService.postWorkout('P55By9sK4yb30UGs1x0wpwry1403', this.workoutPost);
      alert('Current workout deleted!');
    }

    setUserProfileInfo(user: any) {
        console.log(user);

        this.profileEmail = user;

        this.profileSub = this.afService.findUserByEmail(user).subscribe(
            val => {
                this.profileUser = val[0];
                console.log(this.profileUser);
                this.geoLogsPro = JSON.stringify(this.profileUser.fike);
                this.parsedGeoPro = this.geoLogsPro.replace(/[{}]/g, '');
                this.parsedGeoPro = this.parsedGeoPro.replace(/"(.*?)"/g, '');
                this.parsedGeoPro = this.parsedGeoPro.replace(/[:]/g, '');
                this.parsedGeoPro = JSON.parse('[' + this.parsedGeoPro + ']');
                this.timeConverterPro();
                this.parsedGeoPro = this.parsedGeoPro.reverse();
            }
        );
    }

    timeConverterPro() {
        let i;
        for (i = 0; i < this.parsedGeoPro.length; i++) {
            let t = new Date(this.parsedGeoPro[i]);
            this.parsedGeoPro[i] = t;
        }
    }
}

import {Injectable} from '@angular/core';
import {AngularFire, AuthProviders, AuthMethods, FirebaseListObservable, FirebaseObjectObservable} from 'angularfire2';
import {FirebaseObjectFactoryOpts} from 'angularfire2/interfaces';

@Injectable()
export class AF {
  public users: FirebaseListObservable<any>;
  public displayName: string;
  public email: string;
  public user: FirebaseObjectObservable<any>;
  public fikeLog: FirebaseListObservable<any>;
  public validWorkout: FirebaseObjectObservable<any>;
  public workout: FirebaseListObservable<any>;

  constructor(public af: AngularFire) {
    this.af.auth.subscribe(
      (auth) => {
        if (auth != null) {
          this.user = this.af.database.object('registeredUsers/' + auth.uid);
            this.fikeLog = this.af.database.list('registeredUsers/' + auth.uid + '/fike');
            this.validWorkout = this.af.database.object('registeredUsers/' + auth.uid + '/validWorkout');
        }
      });
    this.users = this.af.database.list('registeredUsers');
    this.fikeLog = this.af.database.list('/fike');
    this.validWorkout = this.af.database.object('/validWorkout');
  }

  // Logs out user
  logout() {
    return this.af.auth.logout();
  }

  // Registers user to firebase
  registerUser(email, password) {
    console.log(email);
    return this.af.auth.createUser({
      email: email,
      password: password,
    });
  }

  // Saves new user info to firebase
  saveUserInfoFromForm(uid, name, email, year) {
    return this.af.database.object('registeredUsers/' + uid).set({
      name: name,
      email: email,
      year: year,
    });
  }

  // Logs location and timestamp to firebase
  logFikeFromButton(uid, time) {

      this.fikeLog.push(time);
    //   return this.af.database.object('registeredUsers/' + uid ).update({
    //      fike: time,
    // });
  }

  // Login to site using email and password
  loginWithEmail(email, password) {
    return this.af.auth.login({
        email: email,
        password: password,
      },
      {
        provider: AuthProviders.Password,
        method: AuthMethods.Password,
      });
  }

  // Search through users to give object of the one with email provided
  findUserByEmail(email: string ) {
    this.email = email;
    return this.af.database.list('registeredUsers', {
      query: {
        orderByChild: 'email',
        equalTo: this.email
      }
    });
  }
  //searches through users and gives a list
  findAllUserList() {
      return this.af.database.list('registeredUsers', {
      });
  }
  //posts workout that admins edit
  postWorkout(uid, workoutPost: string) {
      return this.af.database.object('registeredUsers/' + uid).update({
          workout: workoutPost,
      });
  }
  //validates workout submitted
  postValidWorkout(uid, validWorkout) {
    this.validWorkout.set(validWorkout);
  }

}

import {Component, OnInit, AfterViewChecked, ElementRef, ViewChild} from '@angular/core';
import {AF} from "../../providers/af";
import {FirebaseListObservable} from "angularfire2";
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

  constructor() {}

  lat: number = 34.680712;
  lng: number = -82.841609;

  public getLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((pos) => {
        this.position = pos;
        this.latitude = this.position.latitude;
        this.longitude = this.position.longitude;

        console.log(pos);
      });
    } else {
      console.log('not supported');
      this.position = 'Geolocation is not supported by this browser.';
    }
  }
}
// export class HomePageComponent implements OnInit, AfterViewChecked {
//   @ViewChild('scrollMe') private myScrollContainer: ElementRef;
//   public newMessage: string;
//   public messages: FirebaseListObservable<any>;
//
//   constructor(public afService: AF) {
//     this.messages = this.afService.messages;
//   }
//
//   ngOnInit() {}
//
//   ngAfterViewChecked() {
//     this.scrollToBottom();
//   }
//
//   scrollToBottom(): void {
//     try {
//       this.myScrollContainer.nativeElement.scrollTop = this.myScrollContainer.nativeElement.scrollHeight;
//     } catch(err) { }
//   }
//
//   sendMessage(){
//     this.afService.sendMessage(this.newMessage);
//     this.newMessage = '';
//   }
//
//   isYou(email) {
//     if(email == this.afService.email)
//       return true;
//     else
//       return false;
//   }
//
//   isMe(email) {
//     if(email == this.afService.email)
//       return false;
//     else
//       return true;
//   }
// }

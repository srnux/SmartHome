import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { Refresher } from 'ionic-angular';
import { GoogleUserService } from '../../services/google.user.service'
import GoogleUser = gapi.auth2.GoogleUser;

import {Observable} from 'rxjs/Rx';
import { IUser } from '../../services/user';
@Component({
  templateUrl: 'emailNotification.html'
})
export class EmailNotification {
  motion: any;
  illuminance: number;
    brightness: number = 20;
    contrast: number = 0;
    warmth: number = 1300;
    structure: any = { lower: 33, upper: 60 };
    text: number = 0;
    temperature:number=0.0;

    user: IUser = {id:"",name:"",email:"",familyName:"",givenName:"",accessToken:"",imageUrl:"",token:"",threadsTotal:0,historyId:0,messagesTotal:0};
    constructor(public navCtrl: NavController, private googleUserService:GoogleUserService) {
        this.Init();
    }

    Init(refresher?:Refresher) {
      this.googleUserService.signIn().subscribe(
        (p)=>{
          this.user=this.googleUserService.user;
          
          if(refresher)refresher.complete();
        },(e)=>{console.error(e);}
      );
    }

    doRefresh(refresher) {
      this.Init(refresher);
    }
}
import { Component, NgZone } from '@angular/core';
import { NavController } from 'ionic-angular';
import { Refresher } from 'ionic-angular';
import { GoogleUserService } from '../../services/google.user.service';
import { LightService } from '../../services/light.service';
import GoogleUser = gapi.auth2.GoogleUser;
import Message = gapi.client.gmail.Message;
import {Observable} from 'rxjs/Rx';
import { IUser } from '../../services/user';
@Component({
  templateUrl: 'emailNotification.html'
})
export class EmailNotification {
    private messages:Message[];

    user: IUser = {id:"",name:"",email:"",familyName:"",givenName:"",accessToken:"",imageUrl:"",token:"",threadsTotal:0,historyId:0,messagesTotal:0};
    constructor(public navCtrl: NavController, private googleUserService:GoogleUserService,private lightService:LightService, private ngZone:NgZone) {
        this.Init();
        navCtrl.getActive
    }

    Init(refresher?:Refresher) {
      this.googleUserService.signIn().subscribe(
        (p)=>{
          this.user=this.googleUserService.user;//get authenticated user

          this.googleUserService.getCurrentUser().subscribe((mail)=>{
            try {
                this.user.threadsTotal=mail.threadsTotal;
                this.user.messagesTotal= mail.messagesTotal;
                this.user.historyId = mail.historyId;
            } catch (e) {
                console.error(e);
            }
          });

          Observable.interval(10000).subscribe(()=>{
            console.info("check e-mail");
            this.googleUserService.getMessages("newer_than:2d is:unread Category:Personal").subscribe((messages)=>{
              //console.warn(messages);
              try {
                this.ngZone.run(
                  ()=>{
                    this.messages = messages;
                    this.lightService.notify().subscribe();
                  }
                );  
                
              } catch (e) {
                  console.error(e);
              }
            });
          });

          

          if(refresher)refresher.complete();
        },(e)=>{console.error(e);}
      );
    }

    doRefresh(refresher) {
      this.Init(refresher);
    }
}
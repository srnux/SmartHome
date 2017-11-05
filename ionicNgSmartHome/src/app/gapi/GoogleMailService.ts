///// <reference path="../../../node_modules/@types/gapi/index.d.ts" />
///// <reference path="../../../node_modules/@types/gapi.auth2/index.d.ts" />
///// <reference path="../../../node_modules/@types/gapi.client/index.d.ts" />
/// <reference path="../../../node_modules/@types/gapi.client.gmail/index.d.ts" />


import {Injectable} from "@angular/core";
import {Observable} from "rxjs";

import {Observer} from "rxjs/Observer";
import {GoogleApiService} from "./GoogleApiService";
import {GoogleClientService} from "./GoogleClientService";
//import Label = gapi.client.gmail.Label;
import GoogleUser = gapi.auth2.GoogleAuth;
import Message = gapi.client.gmail.Message;
import { IUser } from "../../services/user";

@Injectable()
export class GoogleMailService {
    
    private SESSION_STORAGE_KEY: string = 'accessToken';
    private user: GoogleUser;

    private gmailClient: any;
    private gmailLabelClient: any;
    private requestData = { userId: 'me' };

    constructor(private googleApi: GoogleApiService, private googleClient: GoogleClientService) {
    }

    public getMailClient(): Observable<any> {
        if (!this.gmailClient) {
            return this.googleClient.getClient().mergeMap(() => this.loadGapiGmail());
        }
        return Observable.of(this.gmailClient);
    }
    
    public loadGapiGmail(): Observable<any> { 
        return Observable.fromPromise(
                gapi.client.load('gmail', 'v1').then(()=>{
                    this.gmailClient = gapi.client.gmail;//gapi.client.gmail;  
                    console.info("gapi.client.gmail")
                    return gapi.client.gmail;
            },(e)=>{console.error(e);})
        );  
    }

    public getUserProfile(): Observable<IUser> {
        return Observable.fromPromise(this.gmailClient.users.getProfile(this.requestData))
        .map(this.parseResponseBody)
        .map((userData: any) => {
            console.info(JSON.stringify(userData));
            return <IUser>{
                email: userData.emailAddress,
                threadsTotal: userData.threadsTotal,
                historyId: userData.historyId,
                messagesTotal : userData.messagesTotal
            };
        });
    }

    public getMessages(query?:string): Observable<Message[]> {
        let requestData={
            'userId': 'me',
            'labelIds': 'INBOX',
            'maxResults': 10,
            'q':query
        };
        return Observable.fromPromise(this.gmailClient.users.messages.list(this.requestData))
        .map(this.parseResponseBody)
        .map((userData: any) => {
            console.info(JSON.stringify(userData));
            return userData.messages;
            // return <Message>{
            //     id:userData.id,
            //     threadId:userData.threadId,
            //     internalDate:userData.internalDate,

            //     // email: userData.emailAddress,
            //     // threadsTotal: userData.threadsTotal,
            //     // historyId: userData.historyId,
            //     // messagesTotal : userData.messagesTotal
            // };
        });
    }

    parseResponseBody(data: any) {
        return JSON.parse(data.body || '{}');
    }
}

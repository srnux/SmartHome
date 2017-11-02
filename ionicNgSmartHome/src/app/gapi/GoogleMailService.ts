/// <reference path="../../../node_modules/@types/gapi/index.d.ts" />
/// <reference path="../../../node_modules/@types/gapi.auth2/index.d.ts" />
/// <reference path="../../../node_modules/@types/gapi.client.gmail/index.d.ts" />
/// <reference path="../../../node_modules/@types/gapi.client/index.d.ts" />

import {Injectable} from "@angular/core";
import {Observable} from "rxjs";

import {Observer} from "rxjs/Observer";
import {GoogleApiService} from "./GoogleApiService";
import {GoogleClientService} from "./GoogleClientService";
import Label = gapi.client.gmail.Label;
import GoogleUser = gapi.auth2.GoogleAuth;
import { IUser } from "../../services/user";

@Injectable()
export class GoogleMailService {
    
    private SESSION_STORAGE_KEY: string = 'accessToken';
    private user: GoogleUser;

    private gmailClient: any;
    private gmailLabelClient: any;
    private requestData = { userId: 'me' };

    constructor(private googleApi: GoogleApiService, private googleClient: GoogleClientService) {
        // this.getClient().subscribe((cli)=>{
        //     try {
        //         console.info(cli);
        //     } catch (e) {
        //         console.error(e);
        //     }
        // })
    }

    // public listLabels(): Observable<Label> {
    //     this.gmailLabelClient = gapi.client.gmail.users.labels;
    //     this.gmailLabelClient.listLabels
    //     var request = gapi.client.gmail.users.labels.list({
    //         'userId': 'me'
    //     });
        
    //     return Observable.fromPromise(this.gmailClient.getProfile(this.requestData));

    //     if (!this.GoogleAuth) {
    //         return this.googleApi.onLoad().mergeMap(() => this.loadGapiGmail());
    //     }
    //     return Observable.of(this.GoogleAuth);
    // }

    public getClient(): Observable<any> {
        if (!this.gmailClient) {
            return this.googleClient.getClient().mergeMap(() => this.loadGapiGmail());
        }
        return Observable.of(this.gmailClient);
    }

    public loadGapiGmail(): Observable<IUser> {
        //return Observable.create((observer: Observer<IUser>) => {
            return Observable.fromPromise(gapi.client.load('gmail', 'v1'))
            .flatMap(() => {
                this.gmailClient = gapi.client.gmail.users;//gapi.client.gmail.users;

                return Observable.fromPromise(this.gmailClient.getProfile(this.requestData));
            })
            .map(this.parseResponseBody)
            .map((userData: any) => {
                console.info(userData.JSON);
                return <IUser>{
                    email: userData.emailAddress,
                    threadsTotal: userData.threadsTotal
                };
            });
        //});


        // return Observable.fromPromise(gapi.client.load('gmail', 'v1'))
        // .flatMap(() => {
        //     this.gmailClient = gapi.client.gmail.users.;

        //     return Observable.fromPromise(this.gmailClient.getProfile(this.requestData));
        // })
        // .map(this.parseResponseBody)
        // .map((userData: any) => {
        //     return <IUser>{
        //         email: userData.emailAddress,
        //         threadsTotal: userData.threadsTotal
        //     };
        // });
    }

    parseResponseBody(data: any) {
        return JSON.parse(data.body || '{}');
    }
}

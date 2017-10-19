import { Injectable } from '@angular/core';
import { CookieService } from '../services/cookie.service';
import { environment } from '../../../environments/environment'
import { Http, Response, Headers, RequestOptions } from '@angular/http';

import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/throw';
import 'rxjs/add/operator/map';
import 'rxjs/add/observable/of';

@Injectable()
export class EnvironmentService {
  public baseUrl:string;
  public nuPnPUrl='https://www.meethue.com/api/nupnp/';
  private bridgeIp= "192.168.178.56" //to do- retrieve the IP from service
  
  private hueUserToken:string;

  constructor(private http: Http, private cookieService:CookieService) { this.Init() }
  
  Init() {

      this.hueUserToken = this.cookieService.get('_hue_user_token');
      if(!this.hueUserToken){
          //todo: initialize user - set the cookie - hardcoded for now - use initialization and store new
          this.cookieService.set( '_hue_user_token', 'haKfNfJfRQqyRvdHO-2ub-u2Cp9jGKI7nExNquM1', 3650 );
      }

      //if(environment.production){
        this.baseUrl= `http://${this.bridgeIp}/api/${this.hueUserToken}/`
      //}else{
      //  this.baseUrl= `/api/`;
      //}
      
      this.getBridgeIp();
  }

  //getBridgeIp(): Observable<NuPnPResponse[]> {
    getBridgeIp(): any {
      return this.http.get(this.nuPnPUrl)
        //.map(this.extractArray)
        .do(data => this.testData(data))
        .catch(this.handleError);
  }

  private testData(data: any) {
    console.log('getbridgeIp: ' + JSON.stringify(data));
}
    private extractData(response: Response) {
      let body = response.json();

      return body.data || {};
  }

  private extractArray(response: Response) {
      let body = response.json();

      // Object.keys(body).forEach(function(key) {
      //     console.log(key + ': ' + body[key]);
      // });
      return Object.keys(body).map(function(key) { 
          body[key].id=key;
          return body[key]; 
      }) || {};
      //return body || {};
  }

  private handleError(error: Response): Observable<any> {
      // in a real world app, we may send the server to some remote logging infrastructure
      // instead of just logging it to the console
      console.error(error);
      return Observable.throw(error.json().error || 'Server error');
  }
}

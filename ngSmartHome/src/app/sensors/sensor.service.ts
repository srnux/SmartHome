import { Injectable } from '@angular/core';
import { Http, Response, Headers, RequestOptions } from '@angular/http';

import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/throw';
import 'rxjs/add/operator/map';
import 'rxjs/add/observable/of';

import { ISensor, State, Swupdate, Config } from './sensor';

@Injectable()
export class SensorService {
     
   private baseUrl = 'http://192.168.178.56/api/haKfNfJfRQqyRvdHO-2ub-u2Cp9jGKI7nExNquM1/';

    constructor(private http: Http) { }

    getSensors(): Observable<ISensor[]> {
        return this.http.get(this.baseUrl+ "sensors/")
            .map(this.extractData)
            .do(data => console.log('getSensors: ' + JSON.stringify(data)))
            .catch(this.handleError);
    }

    getSensor(id: number): Observable<ISensor> {
       return this.getSensors().map(sensors => sensors[id]);
    }

    deleteSensor(id: number): Observable<Response> {
        let headers = new Headers({ 'Content-Type': 'application/json' });
        let options = new RequestOptions({ headers: headers });

        const url = `${this.baseUrl}/${id}`;
        return this.http.delete(url, options)
            .do(data => console.log('deleteSensor: ' + JSON.stringify(data)))
            .catch(this.handleError);
    }

    // saveSensor(sensor: ISensor): Observable<ISensor> {
    //     let headers = new Headers({ 'Content-Type': 'application/json' });
    //     let options = new RequestOptions({ headers: headers });

    //     if (sensor.id === 0) {
    //         return this.createSensor(sensor, options);
    //     }
    //     return this.updateSensor(sensor, options);
    // }

    // private createSensor(sensor: ISensor, options: RequestOptions): Observable<ISensor> {
    //     sensor.id = undefined;
    //     return this.http.post(this.baseUrl, sensor, options)
    //         .map(this.extractData)
    //         .do(data => console.log('createSensor: ' + JSON.stringify(data)))
    //         .catch(this.handleError);
    // }

    // private updateSensor(sensor: ISensor, options: RequestOptions): Observable<ISensor> {
    //     const url = `${this.baseUrl}/${sensor.id}`;
    //     return this.http.put(url, sensor, options)
    //         .map(() => sensor)
    //         .do(data => console.log('updateSensor: ' + JSON.stringify(data)))
    //         .catch(this.handleError);
    // }

    private extractData(response: Response) {
        let body = response.json();
        return body || {};
    }

    private handleError(error: Response): Observable<any> {
        // in a real world app, we may send the server to some remote logging infrastructure
        // instead of just logging it to the console
        console.error(error);
        return Observable.throw(error.json().error || 'Server error');
    }

    initializeSensor(): ISensor {
        // Return an initialized object
        return {
            state: <State>{},
            swupdate: <Swupdate>{},
            config: <Config>{},
            name: "",
            type: "",
            modelid: "",
            manufacturername: "",
            swversion: "",
            uniqueid: ""
        };
    }
}

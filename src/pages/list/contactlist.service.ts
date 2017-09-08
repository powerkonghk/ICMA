import { Injectable } from '@angular/core';
import { Contactlist } from './contactlist';
import { Headers, Http } from '@angular/http';
// import 'rxjs/add/operator/toPromise';
// import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/Rx';


@Injectable()
export class ContactlistService {

    private contactlistUrl = './contactlist';  // URL to web api
    // private headers = new Headers({'Content-Type': 'application/json'});
    constructor(private http: Http) { }

    getContactlists(): Promise<Contactlist[]> {
        console.log("getting contactlist http");

        return this.http.get(this.contactlistUrl)
            .toPromise()
            .then(res => res.json() as Contactlist[]);
    }

    getContactlists2(){
        return this.http.get(this.contactlistUrl).map(res => res.json() as Contactlist[]);        
    }

    private handleError(error: any): Promise<any> {
        console.error('An error occurred', error); // for demo purposes only
        return Promise.reject(error.message || error);
    }

}
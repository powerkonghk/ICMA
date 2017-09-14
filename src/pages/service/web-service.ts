import {Http, Headers} from '@angular/http';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/toPromise';
 
export class WebService {  
    static get parameters() {
        return [[Http]];
    }
    caseDesc: string;
    serverityLevel: string;
    caseDate: string;
    caseTime: string;
    selectedContact: Array<any>;

	constructor(private http:Http) {
    }
    
    pushParam(caseDesc, serverityLevel, caseDate, caseTime, selectedContact){
        this.caseDesc = caseDesc;
        this.serverityLevel = serverityLevel;
        this.caseDate = caseDate;
        this.caseTime = caseTime;
        this.selectedContact = selectedContact;
    }

    getPushParam(){
        console.log("##########");
        console.log(this.caseDesc);
        console.log(this.serverityLevel);
        console.log(this.caseDate);
        console.log(this.caseTime);
        console.log(this.selectedContact);
    }
    getCaseDesc(){
        return this.caseDesc;
    }
    
    getServerityLevel(){
        return this.serverityLevel;
    }

    getCaseDate(){
        return this.caseDate;
    }

    getCaseTime(){
        return this.caseTime;
    }

    getSelectedContact(){
        return this.selectedContact;
    }

 
    getService() {
        //var url = 'http://api.themoviedb.org/3/search/movie?query=&query=' + encodeURI('starwar') + '&api_key=5fbddf6b517048e25bc3ac1bbeafb919';
        //var url = 'http://jsonplaceholder.typicode.com/users/';
        var url ='http://192.168.8.100:3000/contactlist'
        var response = this.http.get(url).map(res => res.json());
		return response;
    }


    private headers = new Headers({'Content-Type': 'application/json'});
    
    create(event_id: string, title: string, system: string, report_by: string, incident_dtm: string, 
        desc: string, status: string, severity: string, assigned: Array<any>): Promise<Event> {
        var url = '/event/create'
        return this.http
            .post(url, JSON.stringify({event_id: event_id, title: title, system: system, report_by: report_by, incident_dtm: incident_dtm, 
            desc: desc, status: status, severity: severity, assigned: assigned}), {headers: this.headers})
            .toPromise()
            .then(res => res.json())
            .catch(this.handleError);
    }

    private handleError(error: any): Promise<any> {
        console.error('An error occurred', error); // for demo purposes only
        return Promise.reject(error.message || error);
    }

}
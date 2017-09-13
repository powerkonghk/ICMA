import {Http} from '@angular/http';
import 'rxjs/add/operator/map';
 
export class WebService {  
    static get parameters() {
        return [[Http]];
    }
    caseDesc: string;
    serverityLevel: string;
    caseDate: string;
    caseTime: string;

	constructor(private http:Http) {
    }
    
    pushParam(caseDesc, serverityLevel, caseDate, caseTime){
        this.caseDesc = caseDesc;
        this.serverityLevel = serverityLevel;
        this.caseDate = caseDate;
        this.caseTime = caseTime;
    }

    getPushParam(){
        console.log(this.caseDesc);
        console.log(this.serverityLevel);
        console.log(this.caseDate);
        console.log(this.caseTime);
    }

 
    getService() {
        //var url = 'http://api.themoviedb.org/3/search/movie?query=&query=' + encodeURI('starwar') + '&api_key=5fbddf6b517048e25bc3ac1bbeafb919';
        //var url = 'http://jsonplaceholder.typicode.com/users/';
        var url ='http://192.168.8.100:3000/contactlist'
        var response = this.http.get(url).map(res => res.json());
		return response;
    }
}
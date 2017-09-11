import {Http} from '@angular/http';
import 'rxjs/add/operator/map';
 
export class WebService {  
    static get parameters() {
        return [[Http]];
    }
 
	constructor(private http:Http) {
		
	}
 
    getService() {
        //var url = 'http://api.themoviedb.org/3/search/movie?query=&query=' + encodeURI('starwar') + '&api_key=5fbddf6b517048e25bc3ac1bbeafb919';
        //var url = 'http://jsonplaceholder.typicode.com/users/';
        var url ='http://192.168.8.101:3000/contactlist'
        var response = this.http.get(url).map(res => res.json());
		return response;
    }
}
import {Http, Headers} from '@angular/http';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/timeout';
import 'rxjs/add/operator/toPromise';
import {SettingPage} from '../setting/setting';

 
export class WebService {  
    static get parameters() {
        return [[Http]];
    }
    //new case variable
    caseDesc: string;
    severityLevel: string;
    caseDate: string;
    caseTime: string;
    selectedContact: Array<any>;

    //event variable
    _id: string;
    event_id: string;
    title: string;
    system: string;
    report_by: string;
    incident_dtm: string;
    desc: string;
    status: string;
    severity: string;
    assigned: Array<any>;
    createDtm: string;

    userCorpID: string;
    serverIP: string;
    ackResult: any;

	constructor(private http:Http, private settingPage: SettingPage) {
        //this.serverIP = this.settingPage.getServerIP();
        // /this.userCorpID = this.settingPage.getUserCorpID();
        this.serverIP = "160.68.62.22:3000"
        this.userCorpID = "kwk826";
    }
    
    setUserCorpID(userCorpID){
        this.userCorpID = userCorpID;
    }

    setServerIP(serverIP){
        this.serverIP = serverIP;
    }

    getServerIP(){
        return this.serverIP;
    }

    getUserCorpID(){
        return this.userCorpID;
    }

    setEventDetail(_id, event_id, title, system, report_by, incident_dtm, desc, status, severity, assigned, createDtm){
        this._id = _id;
        this.event_id = event_id;
        this.title = title;
        this.system = system;
        this.report_by = report_by;
        this.incident_dtm = incident_dtm;
        this.desc = desc;
        this.status = status;
        this.severity = severity;
        this.assigned = assigned;
        this.createDtm = createDtm;
    }
    



    pushParam(caseDesc, severityLevel, caseDate, caseTime, selectedContact){
        this.caseDesc = caseDesc;
        this.severityLevel = severityLevel;
        this.caseDate = caseDate;
        this.caseTime = caseTime;
        this.selectedContact = selectedContact;
    }


    getCaseDesc(){
        return this.caseDesc;
    }
    
    getSeverityLevel(){
        return this.severityLevel;
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

    getID(){
        return this._id;
    }
    getEventID(){
        return this.event_id;
    }
    getEventTitle(){
        return this.title;
    }
    getReportBy(){
        return this.report_by;
    }
    getIncidentDtm(){
        return this.incident_dtm;
    }
    getDesc(){
        return this.desc;
    }
    getStatus(){
        return this.status;
    }

    getSeverity(){
        return this.severity;
    }

    getAssigned(){
        return this.assigned;
    }
    getCreateDtm(){
        return this.createDtm
    }
 
    getContactListService() {
        //var url = 'http://api.themoviedb.org/3/search/movie?query=&query=' + encodeURI('starwar') + '&api_key=5fbddf6b517048e25bc3ac1bbeafb919';
        //var url = 'http://jsonplaceholder.typicode.com/users/';
        var url ='http://'+this.serverIP+'/contactlist'
        var response = this.http.get(url).timeout(5000).map(res => res.json());
		return response;
    }


    private headers = new Headers({'Content-Type': 'application/json'});
    
    create(event_id: string, title: string, system: string, report_by: string, incident_dtm: string, 
        desc: string, status: string, severity: string, assigned: Array<any>): Promise<Event> {
        // var url = '/event/create'
        //var url = 'http://'+this.serverIP+'/event/create';
        var url = '/event/create';
        return this.http
            .post(url, JSON.stringify({event_id: event_id, title: title, system: system, report_by: report_by, incident_dtm: incident_dtm, 
            desc: desc, status: status, severity: severity, assigned: assigned}), {headers: this.headers})
            .toPromise()
            .then(res => res.json())
            .catch(this.handleError);
    }

    public handleError(error: any): Promise<any> {
        console.error('An error occurred', error); // for demo purposes only
        return Promise.reject(error.message || error);
    }

    getEvent() : Promise<any> {
        //var url ='http://'+this.serverIP+'/event'
        var url ='/event'
        return this.http.get(url)
        .toPromise()
        .then(response => response.json())
        .catch(this.handleError);
    }

    getContactList() : Promise<any> {
        //var url ='http://'+this.serverIP+'/contactlist'
        var url ='/contactlist'
        return this.http.get(url)
        .toPromise()
        .then(response => response.json())
        .catch(this.handleError);
    }

    ackEvent(userCorpID,status): Promise<Event> {
        //var url = 'http://'+this.serverIP+'/event/update/assigned/update';
        var url = '/event/update/assigned/update';
        return this.http.post(url, JSON.stringify({corpid: this.userCorpID, status: 'ACK', event_id: this.event_id}), {headers: this.headers})
        .toPromise()
        .then(response => {response.json();this.ackResult = response.json().result; })
        .catch(this.handleError);
    }

    closeEvent(event_id): Promise<Event> {
        //var url = 'http://'+this.serverIP+'/event/close';
        var url = '/event/close';
        //console.log("close url"+url);
        console.log("event_id:"+this.event_id);
        return this.http.post(url, JSON.stringify({event_id: this.event_id}), {headers: this.headers})
        .toPromise()
        .then(response => response.json())
        .catch(this.handleError);
    }


    // confirmCloseCase(){
    //     let confirm = this.alertCtrl.create({
    //       title: 'Close current case',
    //       message: 'Do you really want to close the case?',
    //       buttons:[
    //         {
    //           text:'Confirm',
    //           handler:() => {

    //           }
    //         },
    //         {
    //           text:'Cancel',
    //           role: 'cancel',
    //           handler:() => {
    //           }
    //         }
    //       ]
    //     });
    //     confirm.present();
    //   }


    // showAlert(alertMsg){
    //     let alert = this.alertCtrl.create({
    //       //title: alertMsg,
    //       subTitle: alertMsg,
    //       buttons:['Close']
    //     });
    //     alert.present();
    //   }
}
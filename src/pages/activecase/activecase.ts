import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { WebService } from '../service/web-service';

@Component({
  selector: 'page-home',
  templateUrl: 'activecase.html'
})
export class ActiveCasePage {
  
  _id: string;
  event_id: string;
  title: string;
  system: string;
  report_by: string;
  incident_dtm: string;
  desc: string;
  status: string;
  severity: string;
  assigned: string;
  createDtm: string;
  assignedList: Array<any>;
  
  userCorpID : string;
  serverIP: string;
  ackCase: boolean;

  event: any;

  constructor(public navCtrl: NavController, private webService: WebService) {
    this.loadCase();

  }

  doRefresh(refresher) {
      setTimeout(()=>{
        this.webService.getEvent().then(data => {
          this.event = data;
          for (let item of this.event){
            this.webService.setEventDetail(
              item._id, 
              item.event_id,
              item.title, 
              item.system, 
              item.report_by, 
              item.incident_dtm, 
              item.desc, 
              item.status, 
              item.severity, 
              item.assigned, 
              item.createDtm
           );
          }
          this.loadCase();
        }).catch();
        
        refresher.complete();
      },2000);
  }

  ackEvent(){
   this.webService.ackEvent(this.event_id,this.userCorpID);
   this.loadCase();
   this.navCtrl.setRoot(ActiveCasePage);
  }

  closeEvent(){
      this.webService.closeEvent(this.event_id);
  }

  loadCase(){
    this._id=this.webService.getID();
    this.event_id = this.webService.getEventID();
    this.title = this.webService.getEventTitle();
    this.report_by = this.webService.getReportBy();
    this.incident_dtm = this.webService.getIncidentDtm();
    this.desc = this.webService.getDesc();
    this.status = this.webService.getStatus();
    this.severity = this.webService.getSeverity();
    this.assignedList = this.webService.getAssigned();
    this.createDtm = this.webService.getCreateDtm();

    this.userCorpID = this.webService.getUserCorpID();
    this.serverIP = this.webService.getServerIP();

    for (let person of this.assignedList){ 
      if(person.status == 'NEW' && person.corpid == this.userCorpID){
        this.ackCase=true;
      }
    }
  }
}

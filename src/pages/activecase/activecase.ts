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

  constructor(public navCtrl: NavController, private webService: WebService) {
    
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

      // /this.getAssignedList();
  }



  getAssignedList(){
    for (let person of this.assignedList) {
      console.log("person"+person.corp_id);
      console.log("person"+person.name);
      console.log("person"+person.status);
      console.log("person"+person.last_upd_dtm);
      //this.assignedList = this.assigned;
      //this.assignedList.push({corpid:person});
    }
    //this.assignedList = this.assigned.split(",");
    //console.log(this.assigned.split(","));
    //this.assignedList = this.assigned.split(",");
    //console.log(tempArray);
  }
}

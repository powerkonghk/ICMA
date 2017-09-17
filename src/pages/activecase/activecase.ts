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

  constructor(public navCtrl: NavController, private webService: WebService) {
    
      this._id=this.webService.getID();
      this.event_id = this.webService.getEventID();
      this.title = this.webService.getEventTitle();
      this.report_by = this.webService.getReportBy();
      this.incident_dtm = this.webService.getIncidentDtm();
      this.desc = this.webService.getDesc();
      this.status = this.webService.getStatus();
      this.severity = this.webService.getSeverity();
      this.assigned = this.webService.getAssigned();
      this.createDtm = this.webService.getCreateDtm();
  }
}

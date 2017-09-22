import { Component } from '@angular/core';
import { NavController, LoadingController, AlertController } from 'ionic-angular';
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

  constructor(public navCtrl: NavController, private webService: WebService, private loadingCtrl: LoadingController,private alertCtrl: AlertController) {
    this.reloadData();
    this.loadCase();
  }

  runLoader(){
    let loading = this.loadingCtrl.create({
      spinner: 'crescent',
      content: '<div class ="custom-spinner-container"><div class ="custom-spinner-box"></div></div>',
                duration: 2000
    });
    loading.onDidDismiss(()=>{
    });
    loading.present();
  }

reloadData(){
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
  
}
  doRefresh(refresher) {
      setTimeout(()=>{
        this.reloadData();
        if(refresher){
          refresher.complete();
        }       
      },2000);
  }

  ackEvent(refresher){
    this.webService.ackEvent(this.event_id,this.userCorpID).then(()=>{
      if(this.webService.ackResult == 'success'){
        this.ackCase = false;
        this.showAlert("Case Acknowledged!");
      }else{
        this.ackCase = true;
        this.showAlert("Failed to Acknowledge!");
      }
    });
    this.doRefresh(null);
  }

  // closeEvent(){
  //     this.webService.closeEvent(this.event_id);
  //     this.showAlert("Case Closed!");
  //     this.doRefresh(null);
  //     //this.runLoader();
  // }

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

  showAlert(alertMsg){
    let alert = this.alertCtrl.create({
      //title: alertMsg,
      subTitle: alertMsg,
      buttons:['Close']
    });
    alert.present();
  }

  confirmCloseCase(){
    let confirm = this.alertCtrl.create({
      title: 'Close current case',
      message: 'Do you really want to close the case?',
      buttons:[
        {
          text:'Confirm',
          handler:() => {
            this.webService.closeEvent(this.event_id);
            this.runLoader();
            this.doRefresh(null);
          }
        },
        {
          text:'Cancel',
          role: 'cancel',
          handler:() => {
          }
        }
      ]
    });
    confirm.present();
  }
}

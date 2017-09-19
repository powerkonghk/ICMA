import { Component,Input } from '@angular/core';
import { NavController, ToastController } from 'ionic-angular';
import { NgModel} from '@angular/forms';
import { WebService } from '../service/web-service';

@Component({
  selector: 'page-setting',
  templateUrl: 'setting.html'
})
export class SettingPage {
  private serverIP : string;
  private userCorpID : string;
  constructor(public navCtrl: NavController, private webService: WebService, private toastCtrl: ToastController) {
    //this.setConfig();

    //this.serverIP = "192.168.8.106:3000"
    //this.userCorpID = "kwk126";
    this.serverIP = this.webService.getServerIP();
    this.userCorpID = this.webService.getUserCorpID();
    // this.getServerIP();
    // this.getUserCorpID();
  }

  setConfig(){
    this.webService.setServerIP(this.serverIP);
    this.webService.setUserCorpID(this.userCorpID);
    this.presentToast()
  }

  presentToast(){
    let toast = this.toastCtrl.create({
      message: 'Config have been updated!',
      duration: 3000,
      position: 'bottom'
    });
    toast.present();
  }


  sendSMS(){

  }

  getServerIP(){
    return this.serverIP;
  }

  getUserCorpID(){
    return this.getUserCorpID;
  }
}

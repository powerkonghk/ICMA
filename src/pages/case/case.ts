import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import {ListPage} from '../list/list';
import { DatePipe } from '@angular/common';
import { WebService } from '../service/web-service';

@Component({
  selector: 'page-case',
  templateUrl: 'case.html',
  providers: [DatePipe]
})
export class CasePage {
  listPage = ListPage;

  caseDescription : string;
  serverityLevel : string;
  caseDate : String;
  caseTime : String;

  constructor(public navCtrl: NavController, private datePipe: DatePipe, private webService: WebService) {
    this.serverityLevel= "3";
    this.caseDate= this.datePipe.transform(new Date(),'yyyy-MM-dd').toString();
    this.caseTime= this.datePipe.transform(new Date(),'HH:mm').toString();
  }
  pushPage(){
    // this.navCtrl.push(ListPage, {
    //   caseDesc: this.caseDescription,
    //   serverityLevel: this.serverityLevel,
    //   caseDate: this.caseDate,
    //   caseTime: this.caseTime
    // });
    this.webService.pushParam(this.caseDescription,this.serverityLevel,this.caseDate,this.caseTime,null);
    this.navCtrl.push(ListPage);   
  }
}

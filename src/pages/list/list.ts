import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { WebService } from '../service/web-service';
import { SharePage } from '../share/share';

@Component({
  selector: 'page-list',
  templateUrl: 'list.html',
  // providers: [WebService]
})
export class ListPage {
  selectedItem: any;
  icons: string[];
  items: Array<{ title: string, note: string, icon: string }>;
  contactList: Array<any>;
  sharePage = SharePage;
  item: any;
  selectedAll: boolean;
  selectedContact: Array<any> = new Array();

  //selectedName: Array<any>;

  constructor(public navCtrl: NavController, public navParams: NavParams, private webService: WebService) {
    this.getContactList();

    // let caseDesc = navParams.get('caseDesc');
    // let serverity = navParams.get('serverityLevel');
    // let caseDate = navParams.get('caseDate');
    // let caseTime = navParams.get('caseTime');    
    // console.log(caseDesc);
    // console.log(serverity);
    // console.log(caseDate);
    // console.log(caseTime);

    webService.getPushParam();

    // If we navigated to this page, we will have an item available as a nav param
    this.selectedItem = navParams.get('item');

    // Let's populate this page with some filler content for funzies
    // this.icons = ['flask', 'wifi', 'beer', 'football', 'basketball', 'paper-plane',
    // 'american-football', 'boat', 'bluetooth', 'build'];

    // this.items = [];
    // for (let i = 1; i < 11; i++) {
    //   this.items.push({
    //     title: 'Item ' + i,
    //     note: 'This is item #' + i,
    //     icon: this.icons[Math.floor(Math.random() * this.icons.length)]
    //   });
    // }

  }

  checkAll() {
    // if(this.contacts == true){
    //   this.contacts = false;
    // }else{
    //   this.contacts = true;
    // }
    // if(this.item.checked==false){
    //   this.item.checked==true;
    // }

    //console.log(this.item.checked);
    // if (this.selectedAll) {
    //   this.selectedAll = true;
    // } else {
    //     this.selectedAll = false;
    // }
    //console.log(this.selectedAll);
    for (let item of this.contactList) {
      item.selected = this.selectedAll;
    }
  }


  getContactList() {
    //console.log(event.target.value);
    //if(event.target.value.length > 2) {
    this.webService.getService().subscribe(
      data => {
        this.contactList = data;
        //console.log(data);
      },
      err => {
        console.log(err);
      },
      () => console.log('Data fetched')
    );
    //}
  }

  updateSelectedContact() {
    // for(let item of this.contactList) {
    //   console.log(item.name);
    //   console.log(item.corpid);
    // }
    this.selectedContact = new Array();
    for (let item of this.contactList) {
      if (item.selected == true) {
        this.selectedContact.push(item.corpid);
        console.log("::::" + item.corpid + "::::" + item.selected);
      }
    }
    console.log("array!"+this.selectedContact);
  }

  submitCase() {
    //for(let item of this.contactList) {
    //console.log("aaaa"+item.selected);
    //this.selectedContact.push(this.item.selected.name);
    // this.webService.selectedContact.push(this.item.selected.name);
    //} 
    //this.webService.pushSelectedContact(this.selectedContact);
    //this.webService.getSelectedContact();

  }
  // itemTapped(event, item) {
  //   // That's right, we're pushing to ourselves!
  //   this.navCtrl.push(ListPage, {
  //     item: item
  //   });
  // }
}

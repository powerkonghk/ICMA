import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { WebService } from '../service/web-service';
import {SharePage} from '../share/share';

@Component({
  selector: 'page-list',
  templateUrl: 'list.html',
  providers: [WebService]
})
export class ListPage {
  selectedItem: any;
  icons: string[];
  items: Array<{title: string, note: string, icon: string}>;
  contactList: Array<any>;
  sharePage = SharePage;
  
  constructor(public navCtrl: NavController, public navParams: NavParams, private webService: WebService) {
    this.getContactList();
    // If we navigated to this page, we will have an item available as a nav param
    this.selectedItem = navParams.get('item');
    
    // Let's populate this page with some filler content for funzies
    this.icons = ['flask', 'wifi', 'beer', 'football', 'basketball', 'paper-plane',
    'american-football', 'boat', 'bluetooth', 'build'];
    
    this.items = [];
    for (let i = 1; i < 11; i++) {
      this.items.push({
        title: 'Item ' + i,
        note: 'This is item #' + i,
        icon: this.icons[Math.floor(Math.random() * this.icons.length)]
      });
    }
    
  }

  getContactList() {
		//console.log(event.target.value);
		//if(event.target.value.length > 2) {
			this.webService.getService().subscribe(
				data => {
					this.contactList = data; 
					console.log(data);
				},
				err => {
					console.log(err);
				},
				() => console.log('Movie Search Complete')
			);
		//}
	}   

  itemTapped(event, item) {
    // That's right, we're pushing to ourselves!
    this.navCtrl.push(ListPage, {
      item: item
    });
  }
}

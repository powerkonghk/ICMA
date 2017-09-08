import { Component } from '@angular/core';
import { NavController, NavParams, AlertController } from 'ionic-angular';
import { ContactlistService } from './contactlist.service';
import { Contactlist } from './contactlist';
import { OnInit } from '@angular/core';
import { Observable } from 'rxjs/Observable';

@Component({
  selector: 'page-list',
  templateUrl: 'list.html'
})
export class ListPage implements OnInit {
  selectedItem: any;
  icons: string[];
  contactlists: Contactlist[];

  constructor(public navCtrl: NavController, public navParams: NavParams,
    private alertController: AlertController, private contactlistService: ContactlistService) {
    // If we navigated to this page, we will have an item available as a nav param
    this.selectedItem = navParams.get('item');

    // Let's populate this page with some filler content for funzies
    this.icons = ['flask', 'wifi', 'beer', 'football', 'basketball', 'paper-plane',
      'american-football', 'boat', 'bluetooth', 'build'];


    /*
  this.items = [];
  for (let i = 1; i < 11; i++) {
    this.items.push({
      title: 'Item ' + i,
      note: 'This is item #' + i,
      icon: this.icons[Math.floor(Math.random() * this.icons.length)]
    });
  }
  */
  }
  ngOnInit(): void {
    console.log('initializing...');
    //this.contactlistService.getContactlist().then(contactlists => this.contactlists = contactlists);
    this.getContactlist();

  }

  getContactlist(): void {
    
    console.log('start get contactlists...');
    // this.contactlistService.getContactlists().then(contactlists => this.contactlists = contactlists);    
    /*
    //Sync call in Promise way
    this.contactlistService.getContactlists().then(data => {
      console.log(data);
      this.contactlists = data;
    });
*/
    //sync call in subscribe way
    this.contactlistService.getContactlists2().subscribe(data => {
      this.contactlists = data;
    });

    console.log(JSON.stringify(this.contactlists));
    console.log('finish get contactlist');

  }

  toogleClicked() {
    console.log("toogle changed");
    let alert = this.alertController.create({
      title: 'Example',
      subTitle: 'Example subtitle',
      buttons: ['OK']
    });

    alert.present();
  }
}

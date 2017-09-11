import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import {ListPage} from '../list/list';


@Component({
  selector: 'page-case',
  templateUrl: 'case.html'
})
export class CasePage {
  listPage = ListPage;
  constructor(public navCtrl: NavController) {

  }

}

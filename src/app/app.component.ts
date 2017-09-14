import { Component, ViewChild ,OnInit} from '@angular/core';
import { Nav, Platform } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

import { HomePage } from '../pages/home/home';
import { ListPage } from '../pages/list/list';
import { CasePage} from '../pages/case/case';
import { ActiveCasePage} from '../pages/activecase/activecase';
import { ResultPage} from '../pages/result/result';
import { WebService } from '../pages/service/web-service';

@Component({
  templateUrl: 'app.html',
  providers:[WebService]
})
export class MyApp implements OnInit{
  @ViewChild(Nav) nav: Nav;

  rootPage: any = HomePage;
  event: any;
  pages: Array<{title: string, component: any}>;

  constructor(public platform: Platform, public statusBar: StatusBar, public splashScreen: SplashScreen, private webService: WebService) {
    this.initializeApp();

    // used for an example of ngFor and navigation
    this.pages = [
      { title: 'Home', component: HomePage },
      { title: 'List', component: ListPage },
      { title: 'New Case', component: CasePage},
      { title: 'Active Case', component: ActiveCasePage},
      { title: 'Result', component: ResultPage}
    ];

  }

  initializeApp() {
    this.platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      this.statusBar.styleDefault();
      this.splashScreen.hide();
    });
  }

  openPage(page) {
    // Reset the content nav to have just this page
    // we wouldn't want the back button to show in this scenario
    this.nav.setRoot(page.component);
  }

  ngOnInit(): void {
    this.webService.getEvent()
    .then(data => {
      this.event = data;
      console.log(data);
      for (let item of this.event){
        if(item.status == 'inactived'){
          this.nav.setRoot(CasePage);
          //this.openPage(this.pages[2]);
         } else {
           this.nav.setRoot(ActiveCasePage);
           //this.openPage(this.pages[3]);
         }
      }
      
    }).catch(this.handleError);
  }

  private handleError(error: any): Promise<any> {
    console.error('An error occurred', error); // for demo purposes only
    return Promise.reject(error.message || error);
  }
}

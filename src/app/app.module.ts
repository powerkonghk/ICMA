import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { HttpModule } from '@angular/http'; //add for htttp promise

import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';
import { ListPage } from '../pages/list/list';
import { CasePage} from '../pages/case/case';
import { SharePage} from '../pages/share/share';
import { ResultPage} from '../pages/result/result';
import { WebService } from '../pages/service/web-service';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

import {ElasticModule} from 'ng-elastic';
@NgModule({
  declarations: [
    MyApp,
    HomePage,
    ListPage,
    CasePage,
    SharePage,
    ResultPage
  ],
  imports: [
    HttpModule,//add for http promise
    BrowserModule,
    IonicModule.forRoot(MyApp),
    ElasticModule,
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    ListPage,
    CasePage,
    SharePage,
    ResultPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    WebService
  ]
})
export class AppModule {}

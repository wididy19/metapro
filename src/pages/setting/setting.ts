import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams,MenuController } from 'ionic-angular';
import {
  HttpReqProvider
} from '../../providers/http-req/http-req';
import {
  AuthSingletonProvider
} from '../../providers/auth-singleton/auth-singleton';
/**
 * Generated class for the SettingPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-setting',
  templateUrl: 'setting.html',
})
export class SettingPage {

  authInfo:any;
  constructor(public navCtrl: NavController, public navParams: NavParams,public menucontroller: MenuController
  ,public httpreq: HttpReqProvider, public auth: AuthSingletonProvider) {
    this.authInfo = this.auth.authInfo;
  }

  ionViewDidEnter() {
    this.menucontroller.close();
  }

  ionViewWillEnter(){
    
  }
  
}

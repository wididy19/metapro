import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import {
  AuthSingletonProvider
} from '../../providers/auth-singleton/auth-singleton';


/**
 * Generated class for the LakupandaiPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-lakupandai',
  templateUrl: 'lakupandai.html',
})
export class LakupandaiPage {
  authInfo: any;
  constructor(public navCtrl: NavController, public navParams: NavParams, public auth:AuthSingletonProvider) {
    this.authInfo = this.auth.authInfo;
  }

 
  gotopage(page){
    this.navCtrl.push(page);
  }

}

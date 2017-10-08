import {
  Component
} from '@angular/core';
import {
  IonicPage,
  NavController,
  NavParams,
  MenuController,
  LoadingController,
  AlertController,
  ViewController,
  ModalController
} from 'ionic-angular';
import {
  HttpReqProvider
} from '../../providers/http-req/http-req';
import {
  AuthSingletonProvider
} from '../../providers/auth-singleton/auth-singleton';
import {ChangepassPage} 
from '../changepass/changepass';

@IonicPage()
@Component({
  selector: 'page-profile',
  templateUrl: 'profile.html',
})
export class ProfilePage {

authInfo: any;

  constructor(public navCtrl: NavController, public navParams: NavParams,
    public loadingCtrl: LoadingController, public httpreq: HttpReqProvider, public auth: AuthSingletonProvider, public alertctrl: AlertController,public viewCtrl:ViewController, public modalCtrl:ModalController) {
     this.authInfo= this.auth.authInfo;
    }

    openModal(param) {
      let myModal = this.modalCtrl.create(ChangepassPage,{TYPE:param});
      myModal.present();
    }

}

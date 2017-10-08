import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

/**
 * Generated class for the PembelianPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-pembayaran',
  templateUrl: 'pembayaran.html',
})
export class PembayaranPage {

  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

 
  gotopage(page,param){
    this.navCtrl.push(page,{pulsapaket:param});
  }

  gotopagelive(page){
    this.navCtrl.push(page);
  }

}

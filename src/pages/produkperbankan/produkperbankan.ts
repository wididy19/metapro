import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

/**
 * Generated class for the ProdukperbankanPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-produkperbankan',
  templateUrl: 'produkperbankan.html',
})
export class ProdukperbankanPage {

  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }


  gotopage(page){
    this.navCtrl.push(page);
  }

}

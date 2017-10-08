import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { BarcodeScanner,BarcodeScannerOptions } from '@ionic-native/barcode-scanner';

/**
 * Generated class for the QrscannerPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-qrscanner',
  templateUrl: 'qrscanner.html',
})
export class QrscannerPage {

options:BarcodeScannerOptions;
results:{};
  constructor(public navCtrl: NavController, public navParams: NavParams, private barcode: BarcodeScanner) {

  }

async scanBarcode(){
  this.results= await this.barcode.scan() ;
  console.log(this.results);
}

  ionViewWillEnter(){
  this.scanBarcode;
  }

}

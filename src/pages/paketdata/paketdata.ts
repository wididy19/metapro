import {
  DecimalPipe
} from '@angular/common';
import {
  Component
} from '@angular/core';
import {
  IonicPage,
  NavController,
  NavParams,
  MenuController,
  LoadingController,
  AlertController
} from 'ionic-angular';
import {
  HttpReqProvider
} from '../../providers/http-req/http-req';
import {
  AuthSingletonProvider
} from '../../providers/auth-singleton/auth-singleton';

/**
 * Generated class for the PulsapaketdataPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-pulsapaketdata',
  templateUrl: 'pulsapaketdata.html',
})
export class PaketdataPage {
  authInfo: any;
  loading: any;
  pulsapaket: any;
  vendordata: any;
  vendordetail: any;
  selectedvendor: any;
  selecteddetail: any;
  constructor(public navCtrl: NavController, public navParams: NavParams,
    private decimalPipe: DecimalPipe,
    public loadingCtrl: LoadingController, public httpreq: HttpReqProvider, public auth: AuthSingletonProvider, public alertctrl: AlertController) {
    this.authInfo = this.auth.authInfo;
    this.pulsapaket = navParams.get("pulsapaket");
  }

  ionViewWillEnter() {
    this.getVendorData();
  }

  getVendorDetail() {
    var vresponse = [];
    for (let vendor in this.vendordata) {
      var params = {
        xtoken: this.authInfo.token,
        xusername: this.authInfo.username,
        xaction: this.pulsapaket,
        // xtype: this.pulsapaket,
        xvendorcode: this.vendordata[vendor].vendorCode
      }
      console.log(this.vendordata[vendor]);
      var query = "";
      for (let key in params) {
        query += encodeURIComponent(key) + "=" + encodeURIComponent(params[key]) + "&";
      }
      this.loading.present();
      this.httpreq.postreq("semstvendorpulsa?", query)
        .subscribe((response) => {
            if (response.STATUS == "OK" && response.DATA.length !== 0) {
              console.log(response.DATA);
              vresponse[this.vendordata[vendor].vendorCode] = response.DATA;

            } else if (response.STATUS == "OK" && response.DATA.length == 0) {
              vresponse[this.vendordata[vendor].vendorCode] = 'nothing';
            }
            if (response.STATUS != "OK") {
              this.loading.dismiss();
              this.showalert(response.MESSAGE);
            }

          }, (error) => {
            this.loading.dismiss();

            this.showalert("KONEKSI BERMASALAH, HARAP ULANGI BEBERAPA SAAT LAGI");
          }

        )
    }
    this.loading.dismiss();
    this.vendordetail = vresponse;
    this.selectedvendor = this.vendordata[0].vendorCode;
    console.log(this.vendordetail)

    for (let keydata in this.vendordata) {
      for (let keydetail in this.vendordetail) {
        if (keydata == keydetail) {
          break
        }

      }
    }



  }


  existornot = (x): boolean => {
    for (let key in this.vendordetail) {
      if (x === key) {
        return true;
      } else {
        return false;
      }
    }
  }
  getVendorData() {

    var params = {
      xtoken: this.authInfo.token,
      xusername: this.authInfo.username,
      xaction: 'vendor',
      xtype: this.pulsapaket
    }


    var query = "";
    for (let key in params) {
      query += encodeURIComponent(key) + "=" + encodeURIComponent(params[key]) + "&";
    }
    this.showloading();
    this.loading.present();
    this.httpreq.postreq("semstvendorpulsa?", query)
      .subscribe((response) => {
          if (response.STATUS == "OK") {
            this.vendordata = response.DATA;
            this.getVendorDetail();
            console.log(this.vendordata);



          } else if (response.STATUS != "OK") {
            this.loading.dismiss();
            this.showalert(response.MESSAGE);
            console.log(response)
          }

        }, (error) => {
          this.loading.dismiss();

          this.showalert("KONEKSI BERMASALAH, HARAP ULANGI BEBERAPA SAAT LAGI");
        }

      )
  }

  showalert(msg) {
    let alert = this.alertctrl.create({
      title: 'NOTIFICATION',
      subTitle: msg,
      buttons: [{
        text: 'Ok',
        role: 'ok',
        handler: () => {
          this.navCtrl.pop();
        }
      }]
    });

    alert.present();

  }

  showloading(msg ? ) {
    this.loading = this.loadingCtrl.create({
      spinner: 'dots',
      content: 'Please Wait...'
    });
  }


}

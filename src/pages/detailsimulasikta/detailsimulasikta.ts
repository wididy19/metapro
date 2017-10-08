import {
  Component
} from '@angular/core';
import {
  IonicPage,
  NavController,
  NavParams,
  AlertController,
  MenuController,
  LoadingController
} from 'ionic-angular';
import {
  DecimalPipe
} from '@angular/common';
import {
  HomePage
} from '../home/home'
import {
  HttpReqProvider
} from '../../providers/http-req/http-req';
import {
  AuthSingletonProvider
} from '../../providers/auth-singleton/auth-singleton';
/**
 * Generated class for the DetailsimulasiPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-detailsimulasikta',
  templateUrl: 'detailsimulasikta.html',
})
export class DetailsimulasiktaPage {
  authInfo: any;
  loading: any;
  pendapatan: number;
  sukubunga: number;
  property: number;
  uangmuka: number;
  jangkawaktu: number;


  showalert(msg, title) {
    let alert = this.alertctrl.create({
      title: title,
      subTitle: msg,
      buttons: [{
        text: 'Ok',
        role: 'ok',
        handler: () => {
          this.navCtrl.popTo(this.navCtrl.getByIndex(0));
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

  constructor(public navCtrl: NavController, navParams: NavParams, private decimalPipe: DecimalPipe, public alertctrl: AlertController,
    public loadingCtrl: LoadingController, public httpreq: HttpReqProvider, public auth: AuthSingletonProvider) {
    this.pendapatan = navParams.get("pendapatan");
    this.sukubunga = navParams.get("sukubunga");
    this.property = navParams.get("property");
    this.uangmuka = navParams.get("uangmuka");
    this.jangkawaktu = navParams.get("jangkawaktu");
    this.authInfo = this.auth.authInfo;
  }

  submitKredit() {
    var params = {
      xaccountnumber: this.authInfo.accountno,
      xtoken: this.authInfo.token,
      xlocation: this.authInfo.longlat,
      xproductcode: "KTA",
      xbankcode: "BK001",
      xusername: this.authInfo.username
    }


    var query = "";
    for (let key in params) {
      query += encodeURIComponent(key) + "=" + encodeURIComponent(params[key]) + "&";
    }
    this.showloading();
    this.loading.present();
    this.httpreq.postreq("setrnperbankkan?", query)
      .subscribe((response) => {
          if (response.STATUS == "OK") {
            this.loading.dismiss();
            console.log(response)
            this.showalert('Data Telah Disimpan!', 'Notification');

          } else if (response.STATUS != "OK") {
            this.loading.dismiss();
            this.showalert(response.MESSAGE, "Notification");
            console.log(response)
          }

        }, (error) => {
          this.loading.dismiss();

          this.showalert("KONEKSI BERMASALAH, HARAP ULANGI BEBERAPA SAAT LAGI", "Notification");
        }

      )


  }



}

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


@IonicPage()
@Component({
  selector: 'page-transfernasabah',
  templateUrl: 'transfernasabah.html',
})
export class TransfernasabahPage {

  authInfo: any;
  loading: any;
  nasabahdata: any;
  selectednasabah: string='';
  selectedamount: any=0;
  selectedamountstr: string='';
  getCurrency(amount: any) {
    return this.decimalPipe.transform(amount, '1.2-2');
  }
  pin:string;

  constructor(public navCtrl: NavController, public navParams: NavParams,
    private decimalPipe: DecimalPipe,
    public loadingCtrl: LoadingController, public httpreq: HttpReqProvider, public auth: AuthSingletonProvider, public alertctrl: AlertController) {
    this.authInfo = this.auth.authInfo;
    this.startFunc();
  }


  checkForm() {
    if (this.selectedamount == 0) {
      this.showalertsubmit("HARAP ISI JUMLAH TRANSFER");
    }else if(this.selectednasabah==''){
      this.showalertsubmit("HARAP PILIH NO REKENING TUJUAN");
    }
     else if (this.selectedamount !== 0 &&this.selectednasabah!=='' ) {
      this.showPrompt();
    }
  }

  postDaftarTransfer() {
    
    var params = {
      xtoken: this.authInfo.token,
      xusername: this.authInfo.username,
      xaccountnumber: this.authInfo.accountno,
      xaccountnumberto: this.selectednasabah,
      xnominal:this.selectedamount,
      xketerangan:'trasfer',
      xtranfrom:'M',
      xlocation:this.authInfo.longlat
    }
    console.log(params)
    var query = "";
    for (let key in params) {
      query += encodeURIComponent(key) + "=" + encodeURIComponent(params[key]) + "&";
    }
    this.httpreq.postreq("setrntransfer?", query)
      .subscribe((response) => {
          if (response.STATUS == "OK") {
            this.loading.dismiss();
            this.showalert(response.MESSAGE);

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


  startFunc() {
    this.showloading();
    this.loading.present().then(() => {
      this.getnasabahdata()
    })
  }

  getnasabahdata() {
    var params = {
      xtoken: this.authInfo.token,
      xusername: this.authInfo.username,
      xaction: 'list',
      xaccountnumber: this.authInfo.accountno
    }
    var query = "";
    for (let key in params) {
      query += encodeURIComponent(key) + "=" + encodeURIComponent(params[key]) + "&";
    }
    this.httpreq.postreq("semstdaftarnasabah?", query)
      .subscribe((response) => {
          if (response.STATUS == "OK") {
            this.nasabahdata = response.LIST_NASABAH;
            // this.selectednasabah = this.nasabahdata[0].bankCode;
            console.log(this.nasabahdata);
            this.loading.dismiss();


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

  showloading(msg ? ) {
    this.loading = this.loadingCtrl.create({
      spinner: 'dots',
      content: 'Please Wait...'
    });
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

  showalertsubmit(msg) {
    let alert = this.alertctrl.create({
      title: 'NOTIFICATION',
      subTitle: msg,
      buttons: [{
        text: 'Ok',
        role: 'ok',
        handler: () => {}
      }]
    });

    alert.present();

  }



  onChangePrice(evt) {
    this.selectedamount = evt.split(",").join(" ");
    this.selectedamount = this.selectedamount.split(".").join(" ");
    this.selectedamount = this.selectedamount.replace(" ", "");
    if (this.selectedamount != '') {
      this.selectedamountstr = this.getCurrency(this.selectedamount)
      console.log("box_price_formatted: " + this.selectedamount);
    }
  }
  onPriceUp(evt) {
    this.selectedamount = evt.split(",").join(" ");
    this.selectedamount = this.selectedamount.split(".").join(" ");
    this.selectedamount = this.selectedamount.replace(" ", "");
    this.selectedamountstr = this.selectedamount;
  }
  isnan(value) {
    if (isNaN(value)) {
      return true
    } else {
      return false
    }
  }


  showPrompt() {
    let prompt = this.alertctrl.create({
      title: 'PIN',
      message: "Enter Your PIN",
      inputs: [{
        name: 'PIN',
        placeholder: '123456',
        type: 'password',
        max: 6,
        min: 6
      }, ],
      buttons: [{
          text: 'Confirm',
          handler: data => {
            this.pin = data.PIN;
           
            this.saldoModal();
          }
        },
        {
          text: 'Cancel',
          handler: data => {}
        }

      ]
    });
    prompt.present();
  }


  saldoModal() {
    var params = {
      xaccountnumber: this.authInfo.accountno,
      xpin: this.pin,
      xtoken: this.authInfo.token,
      xusername: this.authInfo.username
   
    }

    var query = "";
    for (let key in params) {
      query += encodeURIComponent(key) + "=" + encodeURIComponent(params[key]) + "&";
    }
    this.showloading();
    this.loading.present();
    this.httpreq.postreq("sevalidateaccount?" , query)
      .subscribe((response) => {
          console.log(response)
          
          if (response.STATUS == "OK") {
            this.postDaftarTransfer();

          } else if (response.STATUS != "OK") {
            this.loading.dismiss();
              this.showalert("PIN YANG ANDA MASUKKAN SALAH");
            console.log(response)
          }

        }, (error) => {
          this.loading.dismiss();

          this.showalert("KONEKSI BERMASALAH, HARAP ULANGI BEBERAPA SAAT LAGI");
        }

      )

  }
}

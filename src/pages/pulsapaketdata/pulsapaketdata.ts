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
export class PulsapaketdataPage {
  authInfo: any;
  loading: any;
  pulsapaket: any;
  vendordata: any;
  vendordetail: any;
  selectedvendor: string;
  selecteddetail: any = undefined;
  listavailable: string[];
  doneload: boolean = false;
  handphoneno: string = '';
  pin: string = '';
  constructor(public navCtrl: NavController, public navParams: NavParams,
    private decimalPipe: DecimalPipe,
    public loadingCtrl: LoadingController, public httpreq: HttpReqProvider, public auth: AuthSingletonProvider, public alertctrl: AlertController) {
    this.authInfo = this.auth.authInfo;
    this.pulsapaket = navParams.get("pulsapaket");
    this.startFunc();
  }



  startFunc() {
    this.showloading();
    this.loading.present().then(() => {
      this.getVendorData()
    })
  }

  getVendorDetail() {
    var vresponse = [];
    var vendorlength = 0;
    for (let vendor in this.vendordata) {
      ++vendorlength;
      console.log(this.vendordata.length)
      var params = {
        xtoken: this.authInfo.token,
        xusername: this.authInfo.username,
        xaction: this.pulsapaket,
        xtype: this.pulsapaket,
        xvendorcode: this.vendordata[vendor].vendorCode
      }
      var query = "";
      for (let key in params) {
        query += encodeURIComponent(key) + "=" + encodeURIComponent(params[key]) + "&";
      }
      this.httpreq.postreq("semstvendorpulsa?", query)
        .subscribe((response) => {
            if (response.STATUS == "OK" && response.DATA.length !== 0) {
              console.log("response");
              console.log(response.DATA);
              vresponse[this.vendordata[vendor].vendorCode] = response.DATA;
              if (vendorlength == this.vendordata.length) {
                this.vendordetail = vresponse;
                this.selectedvendor = this.vendordata[0].vendorCode;
                this.doneload = true;
                console.log("hasilakhir")
                console.log(this.vendordetail)
                if (this.loading !== 'nothing') {
                  this.loading.dismiss();
                  this.loading = 'nothing'

                }
              }

            } else if (response.STATUS == "OK" && response.DATA.length == 0) {
              this.selectedvendor = this.vendordata[0].vendorCode;
              if (this.loading !== 'nothing') {
                this.loading.dismiss();
                this.loading = 'nothing'

              }
            }
            if (response.STATUS != "OK") {
              if (this.loading !== 'nothing') {
                this.loading.dismiss();
                this.loading = 'nothing'

              }
              this.showalert(response.MESSAGE);
            }

          }, (error) => {
            if (this.loading !== 'nothing') {
              this.loading.dismiss();
              this.loading = 'nothing'

            }

            this.showalert("KONEKSI BERMASALAH, HARAP ULANGI BEBERAPA SAAT LAGI");
          }

        )
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

  submitPulsa() {
    var paramspulsa = {
      xtoken: this.authInfo.token,
      xusername: this.authInfo.username,
      xaccountnumber: this.authInfo.accountno,
      xpin: this.pin,
      xpulsacode: this.selecteddetail.pulsacode,
      xnominal: this.selecteddetail.price,
      xphonenumber: this.handphoneno,
      xlocation: this.authInfo.location,
      xtranfrom:'M'
    }
    var paramspaket = {
      xtoken: this.authInfo.token,
      xusername: this.authInfo.username,
      xaccountnumber: this.authInfo.accountno,
      xpin: this.pin,
      xpaketdata: this.selecteddetail.pulsacode,
      xnominal: this.selecteddetail.price,
      xphonenumber: this.handphoneno,
      xlocation: this.authInfo.location,
      xtranfrom:'M'
    }
    var query = "";
    for (let key in this.pulsapaket == 'PULSA' ? paramspulsa : paramspaket) {
      query += encodeURIComponent(key) + "=" + encodeURIComponent(
        this.pulsapaket == 'PULSA' ? paramspulsa[key] : paramspaket[key]) + "&";
    }
    this.httpreq.postreq(this.pulsapaket == 'PULSA' ? "setrnpulsa?" : "setrnpaketdata?", query)
      .subscribe((response) => {

          if (response.STATUS == "OK") {

            this.loading.dismiss();
            this.showalert(response.MESSAGE);
          } else if (response.STATUS != "OK") {

            this.loading.dismiss();
            this.showalert(response.MESSAGE);
          }
        }, (error) => {

          this.showalert("KONEKSI BERMASALAH, HARAP ULANGI BEBERAPA SAAT LAGI");
        }

      )
  }

  inputCheck() {
    var phoneno = /^\(?([0-9]{3})\)?[-. ]?([0-9]{3})[-. ]?([0-9]{4})$/;



    if (this.handphoneno == '' || this.selecteddetail == undefined) {
      this.showalert2("Harap Isi Nomor HP dan Pilihan Nominal");
    } else if (this.handphoneno !== '' && this.selecteddetail !== undefined) {
      
      this.showPrompt();

    }
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


  showalert2(msg) {
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


  showloading(msg ? ) {
    this.loading = this.loadingCtrl.create({
      spinner: 'dots',
      content: 'Please Wait...'
    });
  }

  checklength(): boolean {
    var found = 0;
    if (this.doneload == true) {
      for (let vendor in this.vendordetail) {
        if (vendor === this.selectedvendor) {
          found++
        }
      }
    }
    return found > 0 ? true : false
  }
  cekavailable = () => {
    var found = [];
    for (let vendor in this.vendordata) {
      found.push(vendor);

    }
    this.listavailable = found;
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
            this.showloading();
            this.loading.present();      
            this.submitPulsa();
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
}

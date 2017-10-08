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
import {OrderBy}
from '../../pipes/sortgrid3/sortgrid3';
@IonicPage()
@Component({
  selector: 'page-nasabahtransfer',
  templateUrl: 'nasabahtransfer.html',
})

export class NasabahtransferPage {

  authInfo: any;
  loading: any;
  bankdata: any[]=[{
    bankCode:"002",
    bankName:"BANK BRI"
  }];
  selectedbank: any='';
  selectedacc: string='';
  pin:string;

  constructor(public navCtrl: NavController, public navParams: NavParams,
    private decimalPipe: DecimalPipe,
    public loadingCtrl: LoadingController, public httpreq: HttpReqProvider, public auth: AuthSingletonProvider, public alertctrl: AlertController) {
    this.authInfo = this.auth.authInfo;
    this.startFunc();
  }

checkForm(){
  if(this.selectedacc==''){
    this.showalertsubmit("HARAP ISI NO REKENING");
  }else if (this.selectedbank==''){
    this.showalertsubmit("HARAP PILIH BANK");
  }else if (this.selectedacc!==''&&this.selectedbank!==''){
    this.showPrompt();
  }
 
}

  postDaftarTransfer() {
    var params = {
      xtoken: this.authInfo.token,
      xusername: this.authInfo.username,
      xaccountnumber: this.authInfo.accountno,
      xaccountnumberto: this.selectedacc,
      xnasabahname: this.selectedbank.bankName,
      xaction: 'insert',
      xbankcode:this.selectedbank.bankCode
    }
    var query = "";
    for (let key in params) {
      query += encodeURIComponent(key) + "=" + encodeURIComponent(params[key]) + "&";
    }
    this.httpreq.postreq("semstdaftarnasabah?", query)
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
      this.getBankData()
    })
  }  

  getBankData() {
        var params = {
          xtoken: this.authInfo.token,
          xusername: this.authInfo.username,
          xaction: 'list'
        }
        var query = "";
        for (let key in params) {
          query += encodeURIComponent(key) + "=" + encodeURIComponent(params[key]) + "&";
        }
        this.httpreq.postreq("semstbank?", query)
          .subscribe((response) => {
            console.log(response.DATA);
              if (response.STATUS == "OK") {
                this.bankdata = response.DATA;
                console.log(this.bankdata);
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
        handler: () => {
        }
      }]
    });

    alert.present();

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

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
  ViewController
} from 'ionic-angular';
import {
  HttpReqProvider
} from '../../providers/http-req/http-req';
import {
  AuthSingletonProvider
} from '../../providers/auth-singleton/auth-singleton';

/**
 * Generated class for the RegistrationPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-registration',
  templateUrl: 'registration.html',
})
export class RegistrationPage {
  loginpage:boolean=this.navParams.get('loginpage');
  input: {
    nama: string,
    email: string,
    nohandphone: string,
    alamat: string
  }={
    nama: "",
    email: "",
    nohandphone: "",
    alamat: ""
  }
  loading: any;
  showalertsucc(msg) {
    let alert = this.alertctrl.create({
      title: 'NOTIFICATION',
      subTitle: msg,
      buttons: [ {
        text: 'Ok',
        role: 'ok',
        handler: () => {
          this.navCtrl.pop();
        }
      }]
    });

    alert.present();

  }

  showalert(msg) {
    let alert = this.alertctrl.create({
      title: 'NOTIFICATION',
      subTitle: msg,
      buttons: [ {
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

  authInfo: any;

  constructor(public navCtrl: NavController, public navParams: NavParams,
    public loadingCtrl: LoadingController, public httpreq: HttpReqProvider, public auth: AuthSingletonProvider, public alertctrl: AlertController,public viewCtrl:ViewController) {
     this.authInfo= this.auth.authInfo;
    }

  submitButton(){
    var params= {
      "xfullname": this.input.nama,
      "xemail": this.input.email,
      "xphonenumber": this.input.nohandphone,
       "xlocation": this.authInfo.longlat,
      "xaddress": this.input.alamat,
      "ximage": '',
      "xaction": 'insert',
      "xtoken" : this.authInfo.token,
       "xusername": this.authInfo.username,
      "xaccountnumber": this.authInfo.accountno
    }
    var query = "";
    for (let key in params) {
        query += encodeURIComponent(key)+"="+encodeURIComponent(params[key])+"&";
    }

        this.showloading();
        this.loading.present();
        this.httpreq.postreq("semstnasabah?",query)
          .subscribe((response) => {
              if (response.STATUS == "OK") {
                this.loading.dismiss();
                console.log(response)
                this.showalertsucc(response.MESSAGE);
              
                
              } else if(response.STATUS !="OK") {
                this.loading.dismiss();
                this.showalert(response.MESSAGE +' '+ response.STATUS.toUpperCase());
                console.log(response)
              }
    
            }, (error) => {
              this.loading.dismiss();

              this.showalert("KONEKSI BERMASALAH, HARAP ULANGI BEBERAPA SAAT LAGI");
            }
    
          )
      }

      closeModal() {
        this.viewCtrl.dismiss();
      }    

      // this.navCtrl.pop();
  }




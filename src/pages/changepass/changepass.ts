import {
Input, OnChanges,
  SimpleChanges, ViewChild
} from '@angular/core';

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
 * Generated class for the ChangepassPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-changepass',
  templateUrl: 'changepass.html',
})
export class ChangepassPage {


  authInfo: any;
  
    constructor(public navCtrl: NavController, public navParams: NavParams,
     public loadingCtrl: LoadingController, public httpreq: HttpReqProvider, public auth: AuthSingletonProvider, public alertctrl: AlertController,public viewCtrl: ViewController) {
       this.authInfo= this.auth.authInfo; }

input:any={
  oldpin:'',
  newpin:'',
  newpinrep:''
}

loading: any;

type:any=this.navParams.get('TYPE');

  closeModal() {
    this.viewCtrl.dismiss();
  }    


  showloading(msg ? ) {
    this.loading = this.loadingCtrl.create({
      spinner: 'dots',
      content: 'Please Wait...'
    });
  }

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
        }
      }]
    });

    alert.present();

  }

checkpin(){
  if(this.input.newpin!== this.input.newpinrep){
this.showalert(this.type=='PIN'?"PIN BARU TIDAK SAMA":"PASSWORD BARU TIDAK SAMA")
  }else{
    this.changePass();
  }
}



  changePass(){
var  paramspin= {
  xaccountnumber:this.authInfo.accountno,
         xoldpin: this.input.oldpin,
            xnewpin: this.input.newpin,
            xtoken: this.authInfo.token,
            xlocation: this.authInfo.longlat,
  xusername: this.authInfo.username
          }
          
          var  paramspassword= {
            xoldpassword: this.input.oldpin,
               xnewpassword: this.input.newpin,
               xtoken: this.authInfo.token,
               xlocation: this.authInfo.longlat,
     xusername: this.authInfo.username
             }

var query = "";
for (let key in this.type=='PIN'?paramspin:paramspassword) {
    query += encodeURIComponent(key)+"="+encodeURIComponent(this.type=='PIN'?paramspin[key]:paramspassword[key])+"&";
}
    this.showloading();
    this.loading.present();
    this.httpreq.postreq(this.type=='PIN'?"sechangepin?":"sechangepassword?",query)
      .subscribe((response) => {
          if (response.STATUS == "OK") {
            this.loading.dismiss();
            console.log(response)
            this.showalertsucc(this.type=='PIN'?"PIN BERHASIL DIGANTI":"PASSWORD BERHASIL DIGANTI");
          
            
          } else if(response.STATUS !="OK") {
            this.loading.dismiss();
            // this.showalertsucc(this.type=='PIN'?"Proses Gagal":"");      
            this.showalertsucc(response.STATUS);      
            console.log(response)
          }

        }, (error) => {
          this.loading.dismiss();

          this.showalertsucc("KONEKSI BERMASALAH, HARAP ULANGI BEBERAPA SAAT LAGI");
        }

      )
  }

}

@Component({
  selector: 'not-same',
  template: `
  <div>
  <div *ngIf="same=='0'" style="color:#dd0000">
  <p style="
  margin-top: 0px;
  padding-left: 16px;
">Pin/Password Baru Tidak Sama!</p>
  </div>
  </div>
  `
})
export class NotSame implements OnChanges {
  @Input() newpin: string;
  @Input() newpinrep: string;
  @Input() type:string;

  same:string='1';

  constructor() {}

  ngOnChanges(changes: SimpleChanges) {
    for (let propName in changes) {
      if(this.newpin==this.newpinrep){
        this.same='1';
      }else if(this.newpin!==this.newpinrep && this.newpinrep!==''){
        this.same='0';
      }
    }
   
  }
  sendData() {
    
  }
}
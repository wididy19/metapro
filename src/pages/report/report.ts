import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { DatePicker } from '@ionic-native/date-picker';
import moment from 'moment';
/**
 * Generated class for the ReportPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-report',
  templateUrl: 'report.html',
})
export class ReportPage {

   event: any = {
   datefrom: moment().format("YYYY-MM-DD"),
    dateto: moment().format("YYYY-MM-DD"),
    report: true
  }

  constructor(public navCtrl: NavController, public navParams: NavParams,public datePicker: DatePicker) {
  }

  gotopage(page){
    this.navCtrl.push(page,this.event);
  }
}
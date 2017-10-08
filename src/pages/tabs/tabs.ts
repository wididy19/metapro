import { Component, } from '@angular/core';

import { HelpPage } from '../help/help';
import { ProfilePage } from '../profile/profile';
import { HomePage } from '../home/home';
import { HistoryPage } from '../history/history';
import {LoginPage} from '../login/login';
import { NavController,MenuController  } from 'ionic-angular';

@Component({
  templateUrl: 'tabs.html'
})
export class TabsPage {

  tab1Root = HomePage;
  tab2Root = HistoryPage;
  tab3Root = HelpPage;
  tab4Root = ProfilePage;

  constructor(public navcontroller: NavController,public menucontroller: MenuController) {
 this.menucontroller.enable(true, 'myMenu');

  }


}

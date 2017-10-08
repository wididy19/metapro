import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { KpmPage } from './kpm';

@NgModule({
  declarations: [
    KpmPage,
  ],
  imports: [
    IonicPageModule.forChild(KpmPage),
  ],
})
export class KpmPageModule {}

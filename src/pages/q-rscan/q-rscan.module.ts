import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { QRscanPage } from './q-rscan';

@NgModule({
  declarations: [
    QRscanPage,
  ],
  imports: [
    IonicPageModule.forChild(QRscanPage),
  ],
})
export class QRscanPageModule {}

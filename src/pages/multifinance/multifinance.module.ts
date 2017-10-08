import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { MultifinancePage } from './multifinance';

@NgModule({
  declarations: [
    MultifinancePage,
  ],
  imports: [
    IonicPageModule.forChild(MultifinancePage),
  ],
})
export class MultifinancePageModule {}

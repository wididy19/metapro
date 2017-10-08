import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { MultipaymentPage } from './multipayment';

@NgModule({
  declarations: [
    MultipaymentPage,
  ],
  imports: [
    IonicPageModule.forChild(MultipaymentPage),
  ],
})
export class MultipaymentPageModule {}

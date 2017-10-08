import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { KpaPage } from './kpa';

@NgModule({
  declarations: [
    KpaPage,
  ],
  imports: [
    IonicPageModule.forChild(KpaPage),
  ],
})
export class KpaPageModule {}

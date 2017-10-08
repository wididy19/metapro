import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { KtaPage } from './kta';

@NgModule({
  declarations: [
    KtaPage,
  ],
  imports: [
    IonicPageModule.forChild(KtaPage),
  ],
})
export class KtaPageModule {}

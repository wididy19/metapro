import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { NasabahtransferPage } from './nasabahtransfer';
import {OrderBy}
from '../../pipes/sortgrid3/sortgrid3';
@NgModule({
  declarations: [
    NasabahtransferPage,OrderBy
  ],
  imports: [
    IonicPageModule.forChild(NasabahtransferPage),
  ],
  providers:[OrderBy]
})
export class NasabahtransferPageModule {}

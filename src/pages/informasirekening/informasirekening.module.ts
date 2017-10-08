import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { InformasirekeningPage } from './informasirekening';
import {SortgridPipe2}
from '../../pipes/sortgrid2/sortgrid2';


@NgModule({
  declarations: [
    InformasirekeningPage,SortgridPipe2
  ],
  imports: [
    IonicPageModule.forChild(InformasirekeningPage),
  ],
  providers:[SortgridPipe2]
})
export class InformasirekeningPageModule {}

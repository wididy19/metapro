import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { HistoryPage } from './history';
import {SortgridPipe}
from '../../pipes/sortgrid/sortgrid';
@NgModule({
  declarations: [
    HistoryPage,SortgridPipe
  ],
  imports: [
    IonicPageModule.forChild(HistoryPage),
  ],
  providers:[SortgridPipe]
})
export class HistoryPageModule {}

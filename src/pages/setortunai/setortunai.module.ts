import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { SetortunaiPage } from './setortunai';
import { AgmCoreModule} from '@agm/core';

@NgModule({
  declarations: [
    SetortunaiPage,
  ],
  imports: [
    IonicPageModule.forChild(SetortunaiPage),
    AgmCoreModule.forRoot({
      apiKey: 'AIzaSyDfbk4cvPuRXj7iSEWPAPYEZtc-DUdlo-s'
    })
  ],
})
export class SetortunaiPageModule {}

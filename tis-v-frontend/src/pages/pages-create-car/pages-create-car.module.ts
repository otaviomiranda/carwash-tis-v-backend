import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { PagesCreateCarPage } from './pages-create-car';

import { BrMaskerModule } from 'brmasker-ionic-3';
@NgModule({
  declarations: [
    PagesCreateCarPage,
  ],
  imports: [
    BrMaskerModule,
    IonicPageModule.forChild(PagesCreateCarPage),
  ],
})
export class PagesCreateCarPageModule {}

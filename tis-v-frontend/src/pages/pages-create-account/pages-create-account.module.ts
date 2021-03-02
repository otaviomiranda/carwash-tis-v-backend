import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { PagesCreateAccountPage } from './pages-create-account';

import { BrMaskerModule } from 'brmasker-ionic-3';
@NgModule({
  declarations: [
    PagesCreateAccountPage,
  ],
  imports: [
    BrMaskerModule,
    IonicPageModule.forChild(PagesCreateAccountPage),
  ],
})
export class PagesCreateAccountPageModule {}

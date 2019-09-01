import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { PagesCreateCheckingAccountPage } from './pages-create-checking-account';

@NgModule({
  declarations: [
    PagesCreateCheckingAccountPage,
  ],
  imports: [
    IonicPageModule.forChild(PagesCreateCheckingAccountPage),
  ],
})
export class PagesCreateCheckingAccountPageModule {}

import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { PagesEditCheckingAccountPage } from './pages-edit-checking-account';

@NgModule({
  declarations: [
    PagesEditCheckingAccountPage,
  ],
  imports: [
    IonicPageModule.forChild(PagesEditCheckingAccountPage),
  ],
})
export class PagesEditCheckingAccountPageModule {}

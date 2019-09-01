import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { PagesMainPage } from './pages-main';

@NgModule({
  declarations: [
    PagesMainPage,
  ],
  imports: [
    IonicPageModule.forChild(PagesMainPage),
  ],
})
export class PagesMainPageModule {}

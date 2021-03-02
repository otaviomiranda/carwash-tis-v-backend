import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';

import { HttpModule } from '@angular/http';

import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';
//import { PagesMainPage } from '../pages/pages-main/pages-main';

import { IonicStorageModule } from '@ionic/storage';

import { BrMaskerModule } from 'brmasker-ionic-3';
import { ProvidersCreateCheckingAccountProvider } from '../providers/providers-create-checking-account/providers-create-checking-account';
import { ProvidersSearchCheckingAccountProvider } from '../providers/providers-search-checking-account/providers-search-checking-account';

import { FCM } from '@ionic-native/fcm';
import { ProviderFcmProvider } from '../providers/provider-fcm/provider-fcm';
import { ProvidersUserProvider } from '../providers/providers-user/providers-user';
import { ProvidersCarProvider } from '../providers/providers-car/providers-car';
import { ProviderServiceProvider } from '../providers/provider-service/provider-service';

@NgModule({
  declarations: [
    MyApp,
    HomePage
    //PagesMainPage
  ],
  imports: [
    BrowserModule,
    HttpModule,
    BrMaskerModule,
    IonicModule.forRoot(MyApp),
    IonicStorageModule.forRoot()
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage
    //PagesMainPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    FCM,
    { provide: ErrorHandler, useClass: IonicErrorHandler },
    ProvidersCreateCheckingAccountProvider,
    ProvidersSearchCheckingAccountProvider,
    ProviderFcmProvider,
    ProvidersUserProvider,
    ProvidersCarProvider,
    ProviderServiceProvider
  ]
})
export class AppModule { }

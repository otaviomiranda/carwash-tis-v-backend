import { Component } from '@angular/core';
import { Platform, NavController } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { FCM, NotificationData } from "@ionic-native/fcm";

import { HomePage } from '../pages/home/home';
import { PagesMainPage } from '../pages/pages-main/pages-main'

import { Storage } from "@ionic/storage";

@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  rootPage: any = HomePage;

  constructor(public platform: Platform,
    public statusBar: StatusBar,
    public splashScreen: SplashScreen,
    private fcm: FCM,
    public storage: Storage) {
    platform.ready().then(() => {
      this.statusBar.styleDefault();
      this.splashScreen.hide();

      this.storage.get("user").then(val => {
        if (val != null && val != undefined)
        this.rootPage = PagesMainPage;
      });

    });
  }

  initializeApp() {
    this.platform.ready().then(() => {
      this.statusBar.styleDefault();
      this.splashScreen.hide();

      this.fcm.subscribeToTopic('testTopic');

      this.fcm.onNotification().subscribe(
        (data: NotificationData) => {
          if (data.wasTapped) {
            console.log("Received in background", JSON.stringify(data))
            alert(JSON.stringify(data))

          } else {
            console.log("Received in foreground", JSON.stringify(data))
            alert(JSON.stringify(data))
          }
        }, error => {
          console.error("Error in notification", error)
        }
      );

    });
  }

  subscribeToTopic(topic) {
    this.fcm.subscribeToTopic(topic);
  }

  unsubscribeFromTopic(topic) {
    this.fcm.unsubscribeFromTopic(topic);
  }

}


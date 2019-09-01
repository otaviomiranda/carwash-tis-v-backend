import { Injectable } from '@angular/core';
import { FCM, NotificationData } from "@ionic-native/fcm";
import { Http, Headers } from "@angular/http";

@Injectable()
export class ProviderFcmProvider {

  constructor(private http: Http, private fcm: FCM) { }

  subscribeToTopic(topic) {
    this.fcm.subscribeToTopic(topic).then((data => {
      console.log(data);
    })).catch((err) => {
      console.log(err);
    });
  }

  onNotification(): Promise<any> {

    return new Promise((resolve, reject) => {
      this.fcm.onNotification().subscribe((data: NotificationData) => {
        resolve(data);
      }, error => {
        reject(error);
      })
    })
  }

  unsubscribeFromTopic(topic) {
    this.fcm.unsubscribeFromTopic(topic);
  }

  sendMessage(message): Promise<any> {

    let headers = new Headers();

    headers.append("x-api-key", "ZgWcQNHFR77yAPZRV76ShIFCVKXRjjn4sic2dF6a");
    headers.append("Content-Type", "application/x-www-form-urlencoded");

    return this.http
      .post(
        "https://ead9k1eivi.execute-api.us-east-1.amazonaws.com/dev/fcm",
        message,
        {
          headers: headers
        }
      )
      .toPromise();
  }

}

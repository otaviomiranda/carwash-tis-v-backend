import { Headers, Http, RequestOptions } from "@angular/http";
import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import "rxjs/add/operator/map";

import { Storage } from '@ionic/storage';
import { LoadingController } from 'ionic-angular';

@Injectable()
export class ProvidersCreateCheckingAccountProvider {

  constructor(public http: Http, public storage: Storage) {
    console.log('Hello ProvidersCreateCheckingAccountProvider Provider');
  }

  create(checkingAccount): Promise<any> {
    let headers = new Headers();
    headers.append("x-api-key", "ZgWcQNHFR77yAPZRV76ShIFCVKXRjjn4sic2dF6a");
    headers.append("Content-Type", "application/x-www-form-urlencoded");

    return this.http
      .post(
        "https://ead9k1eivi.execute-api.us-east-1.amazonaws.com/dev/checking-account",
        checkingAccount,
        {
          headers: headers
        }
      )
      .toPromise();
  }
}



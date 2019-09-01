import { Http, RequestOptions, Headers } from "@angular/http";
import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import "rxjs/add/operator/map";

import { Storage } from "@ionic/storage";

@Injectable()
export class ProvidersUserProvider {

  constructor(public http: Http, public storage: Storage) {
    console.log("Hello ProvidersCreateUserProvider Provider");
  }
  create(person): Promise<any> {
    let headers = new Headers();
    headers.append("x-api-key", "ZgWcQNHFR77yAPZRV76ShIFCVKXRjjn4sic2dF6a");
    headers.append("Content-Type", "application/x-www-form-urlencoded");

    return this.http
      .post(
        "https://ead9k1eivi.execute-api.us-east-1.amazonaws.com/dev/create-account",
        person,
        {
          headers: headers
        }
      )
      .toPromise();
  }

  login(person): Promise<any> {
    let headers = new Headers();
    headers.append("x-api-key", "ZgWcQNHFR77yAPZRV76ShIFCVKXRjjn4sic2dF6a");
    headers.append("Content-Type", "application/x-www-form-urlencoded");

    return this.http
      .post(
        "https://ead9k1eivi.execute-api.us-east-1.amazonaws.com/dev/login",
        person,
        {
          headers: headers
        }
      )
      .toPromise();
  }
}

import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Http, RequestOptions, Headers } from "@angular/http";

/*
  Generated class for the ProviderServiceProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class ProviderServiceProvider {

  constructor(public http: Http) {
    console.log('Hello ProviderServiceProvider Provider');
  }

  acceptService(service): Promise<any> {
    let headers = new Headers();

    headers.append("x-api-key", "ZgWcQNHFR77yAPZRV76ShIFCVKXRjjn4sic2dF6a");
    headers.append("Content-Type", "application/x-www-form-urlencoded");

    return this.http
      .post(
        "https://ead9k1eivi.execute-api.us-east-1.amazonaws.com/dev/service",
        service,
        {
          headers: headers
        }
      )
      .toPromise();
  }


}

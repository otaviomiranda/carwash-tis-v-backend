import { Http, RequestOptions, Headers } from "@angular/http";
import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import "rxjs/add/operator/map";

@Injectable()
export class ProvidersCarProvider {

  constructor(public http: Http) {
    console.log("Hello ProvidersCreateCarProvider Provider");
  }

  create(car): Promise<any> {
    let headers = new Headers();

    headers.append("x-api-key", "ZgWcQNHFR77yAPZRV76ShIFCVKXRjjn4sic2dF6a");
    headers.append("Content-Type", "application/x-www-form-urlencoded");

    return this.http
      .post(
        "https://ead9k1eivi.execute-api.us-east-1.amazonaws.com/dev/cars",
        car,
        {
          headers: headers
        }
      )
      .toPromise();
  }

  getCars(customer_id): Promise<any> {
    let headers = new Headers();

    headers.append("x-api-key", "ZgWcQNHFR77yAPZRV76ShIFCVKXRjjn4sic2dF6a");
    headers.append("Content-Type", "application/x-www-form-urlencoded");

    return this.http
      .post(
        "https://ead9k1eivi.execute-api.us-east-1.amazonaws.com/dev/cars/temporary-get-cars",
        { customer_id },
        { headers: headers }
      )
      .toPromise();
  }

}
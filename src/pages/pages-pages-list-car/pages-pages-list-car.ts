import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController } from 'ionic-angular';
import { ProvidersCarProvider } from '../../providers/providers-car/providers-car';

import { Storage } from '@ionic/storage';
import { LoadingController } from 'ionic-angular';

@IonicPage()
@Component({
  selector: 'page-pages-pages-list-car',
  templateUrl: 'pages-pages-list-car.html',
})
export class PagesPagesListCarPage {

  public cars = [];
  public user = null;
  private load;

  constructor(public navCtrl: NavController,
    public navParams: NavParams,
    private alertCtrl: AlertController,
    public CarProvider: ProvidersCarProvider,
    public storage: Storage,
    public loadingCtrl: LoadingController) {

    this.storage.get("user").then(val => {

      this.user = val;
      console.log(this.user)

      this.load = this.presentLoading();
      this.load.present();

      this.CarProvider.getCars(this.user.customer_id).then((response => {
        this.cars = JSON.parse(response.body || response._body).result;
        console.log('todos os carros');
        console.log(this.cars);
        this.load.dismiss();
      })).catch((error: any) => {
        console.log('error')
        console.log(error)
        this.load.dismiss();
      });;

    });
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad PagesPagesListCarPage');
  }

  alertMessage(message) {
    let alert = this.alertCtrl.create({
      title: 'Alerta',
      message: message,
      buttons: ['Ok']
    });
    alert.present();
  }

  goTo(page) {
    this.navCtrl.push(page);
  }

  presentLoading() {
    return this.loadingCtrl.create({
      content: "Carregando...",
    });
  };
}

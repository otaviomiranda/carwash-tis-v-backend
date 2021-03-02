import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

import { ToastController } from 'ionic-angular';
import { ProvidersCarProvider } from '../../providers/providers-car/providers-car';

import { Storage } from '@ionic/storage';
import { LoadingController } from 'ionic-angular';

@IonicPage()
@Component({
  selector: 'page-pages-create-car',
  templateUrl: 'pages-create-car.html',
})
export class PagesCreateCarPage {

  public car = {
    customer_id: null,
    model: '',
    year: '',
    plate: ''
  }

  public user = {
    customer_id: null,
    service_provider_id: null,
    first_name: "",
    last_name: "",
    birth_date: "",
    phone: "",
    email: "",
    password: "",
    confirm_password: "",
    cpf: "",
    is_customer: false
  }

  constructor(public navCtrl: NavController,
    public navParams: NavParams,
    public toastCtrl: ToastController,
    public providersCreateCarProvider: ProvidersCarProvider,
    public storage: Storage,
    public loadingCtrl: LoadingController) {
    this.storage.get("user").then(val => {
      console.log(val)
      this.user = val;
    });
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad PagesCreateCarPage');
  }

  alertMessage(message) {
    const toast = this.toastCtrl.create({
      message: message,
      duration: 5000
    });
    toast.present();
  };

  goToRootPage() {
    this.navCtrl.popToRoot();
  };

  presentLoading() {
    var loader = this.loadingCtrl.create({
      content: "Carregando...",
      duration: 3000
    });
    loader.present();
  };

  createCar() {

    this.presentLoading();

    if (!this.car.model)
      this.alertMessage('O modelo do carro é um campo obrigatório');
    else if (!this.car.plate)
      this.alertMessage('A placa é um campo obrigatório');
    else if (!this.car.year)
      this.alertMessage('O ano do carro é um campo obrigatório');
    else {

      this.car.customer_id = this.user.customer_id;
      /* customer id added manually for tests */

      this.providersCreateCarProvider.create(this.car)
        .then((result: any) => {

          let response = JSON.parse(result.body || result._body);

          if (response.errorMessage) {

            let error = JSON.parse(response.errorMessage);
            let dup_entry = error.trace.stack.match(/ER_DUP_ENTRY/g);

            if (dup_entry) {
              this.alertMessage('Esse veículo já estava cadastrado em sua conta');
            } else {
              this.alertMessage('Não foi possível completar a solicitação')
            }

            console.log(error);

          } else {

            console.log(result);
            this.navCtrl.push('PagesPagesListCarPage');
          }

        });
    }
  };

}

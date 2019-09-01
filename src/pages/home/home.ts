import { Component } from "@angular/core";
import { NavController, AlertController, LoadingController } from "ionic-angular";

import { Storage } from "@ionic/storage";
import { Person } from "../../models/Person";

import { ProvidersUserProvider } from '../../providers/providers-user/providers-user';

@Component({
  selector: "page-home",
  templateUrl: "home.html"
})
export class HomePage {
  public person: Person;
  private load;

  constructor(public navCtrl: NavController,
    private alertCtrl: AlertController,
    public providersUserProvider: ProvidersUserProvider,
    public storage: Storage,
    public loadingCtrl: LoadingController) {

    this.person = new Person();

  }

  ionViewDidLoad() { }

  goToPage(page) {
    this.navCtrl.push(page);
  }

  alertMessage(message) {
    let alert = this.alertCtrl.create({
      title: 'Alerta',
      message: message,
      buttons: ['Ok']
    });
    alert.present();
  }

  presentLoading() {
    return this.loadingCtrl.create({
      content: "Carregando...",
    });
  };

  login() {

    if (!this.person.email) this.alertMessage("Informe o e-mail");
    else if (!this.person.password) this.alertMessage("Informe a senha");
    else {

      this.load = this.presentLoading();
      this.load.present();

      this.providersUserProvider
        .login(this.person)
        .then((result: any) => {
          let response = JSON.parse(result._body);
          if (response.errorMessage != undefined) {
            let error = JSON.parse(response.errorMessage);
            this.load.dismiss();
            this.alertMessage(error.trace.err);
          } else {
            this.person = response.result;
            this.storage.set("user", this.person);

            this.load.dismiss();
            this.navCtrl.push("PagesMainPage");
          }
        })
        .catch((error: any) => {
          console.log(error)
          this.load.dismiss();
          this.alertMessage("Não foi possível completar a solicitação");
        });
    }
  }
}

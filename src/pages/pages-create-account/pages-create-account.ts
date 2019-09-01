import { Component } from "@angular/core";
import { IonicPage, NavController, NavParams, AlertController } from "ionic-angular";

import { ProvidersUserProvider } from '../../providers/providers-user/providers-user';

import { Storage } from '@ionic/storage';
import { LoadingController } from 'ionic-angular';
import { Person } from "../../models/Person";

@IonicPage()
@Component({
  selector: "page-pages-create-account",
  templateUrl: "pages-create-account.html"
})
export class PagesCreateAccountPage {

  public person: Person;
  private load;

  constructor(public navCtrl: NavController,
    public navParams: NavParams,
    private alertCtrl: AlertController,
    public providersUserProvider: ProvidersUserProvider,
    public storage: Storage,
    public loadingCtrl: LoadingController) {

    this.person = new Person();
  }

  ionViewDidLoad() {
  }

  alertMessage(message) {
    let alert = this.alertCtrl.create({
      title: 'Alerta',
      message: message,
      buttons: ['Ok']
    });
    alert.present();
  }

  goToRootPage() {
    this.navCtrl.popToRoot();
  }

  presentLoading() {
    return this.loadingCtrl.create({
      content: "Carregando...",
    });
  };

  createUser() {

    if (!this.person.first_name)
      this.alertMessage('O nome é obrigatório')
    else if (!this.person.last_name)
      this.alertMessage('O sobrenome é obrigatório')
    else if (!this.person.email)
      this.alertMessage('O nome é e-mail')
    else if (!this.person.birth_date)
      this.alertMessage('O data de nascimento é obrigatório')
    else if (!this.person.phone)
      this.alertMessage('O telefone é obrigatório')
    else if (!this.person.cpf)
      this.alertMessage('O CPF é obrigatório')
    else {

      this.providersUserProvider.create(this.person)
        .then((result: any) => {

          this.load = this.presentLoading();
          this.load.present();

          let response = JSON.parse(result._body);
         
          if (response.errorMessage != undefined) {
            let error = JSON.parse(response.errorMessage);
            this.alertMessage('Esse CPF já foi cadastrado.');
          } else {

          }

          this.load.dismiss();

        }).catch((error: any) => {
          this.load.dismiss();
          this.alertMessage('Não foi possível completar a solicitação');
        });
    }
  }
}

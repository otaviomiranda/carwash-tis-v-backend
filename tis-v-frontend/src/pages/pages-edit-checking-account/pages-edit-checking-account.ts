import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { ProvidersCreateCheckingAccountProvider } from '../../providers/providers-create-checking-account/providers-create-checking-account'
import { LoadingController } from 'ionic-angular';
import { Storage } from '@ionic/storage';
import { ToastController } from 'ionic-angular';

@IonicPage()
@Component({
  selector: 'page-pages-edit-checking-account',
  templateUrl: 'pages-edit-checking-account.html',
})
export class PagesEditCheckingAccountPage {

  public checkingAccount = {
    bank: '',
    agency: '',
    account: ''
  }

  public user = {}

  constructor(public navCtrl: NavController,
    public providersCreateCheckingAccountProvider: ProvidersCreateCheckingAccountProvider,
    public storage: Storage,
    public toastCtrl: ToastController,
    public loadingCtrl: LoadingController,
    public navParams: NavParams) {

    this.storage.get("user").then(val => {
      console.log(val)
      this.user = val;
    });
  }

  ionViewDidLoad() {
    console.log('Hello edit');
  }

  alertMessage(message) {
    const toast = this.toastCtrl.create({
      message: message,
      showCloseButton: true,
      closeButtonText: "Ok"
    });
    toast.present();
  }

  presentLoading() {
    return this.loadingCtrl.create({
      content: "Carregando...",
    });
  };

  goToPage(page) {
    this.navCtrl.push(page);
  }

  createAccount() {

    if (!this.checkingAccount.bank)
      this.alertMessage('Informe o banco');
    else if (!this.checkingAccount.agency)
      this.alertMessage('Informe a agência');
    else if (!this.checkingAccount.account)
      this.alertMessage('Informe a conta');
    else {
      this.presentLoading().present();
      this.providersCreateCheckingAccountProvider.create(this.checkingAccount).then((result: any) => {
        console.log(result)
        this.presentLoading().dismiss();
      }).catch((error: any) => {
        console.log(error)
        this.presentLoading().dismiss();
        this.alertMessage('Não foi possível completar a solicitação');
      });;
    }
  }
}

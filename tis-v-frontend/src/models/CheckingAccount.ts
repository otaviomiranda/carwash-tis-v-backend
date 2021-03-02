export class CheckingAccount {
    public number: String;
    public agency: String;
    public bank: String;

    constructor() { }
    
    public getNumber(): String {
        return this.number;
    }

    public setNumber(number: String) {
        this.number = number;
    }

    public getAgency(): String {
        return this.agency;
    }

    public setAgency(agency: String) {
        this.agency = agency;
    }

    public getBank(): String {
        return this.bank;
    }

    public setBank(bank: String){
        this.bank = bank;
    }

}
export class Person {

  public first_name: string;
  public last_name: string;
  public birth_date: Date;
  public phone: string;
  public email: string;
  public password: string;
  public cpf: string;

  constructor() { }

  public getFirstName(): String {
    return this.first_name;
  }

  public setFirstName(first_name: string) {
    this.first_name = first_name.charAt(0).toUpperCase() + first_name.slice(1);
  }

  public getLastName(): String {
    return this.last_name;
  }

  public setLastName(last_name: string) {
    this.last_name = last_name.charAt(0).toUpperCase() + last_name.slice(1);
  }

  public getCompleteName(): string {
    return `${this.getFirstName()} ${this.getLastName()}`;
  }

  public getBirthDate(): Date {
    return this.birth_date;
  }

  public setBirthDate(birth_date: Date) {
    this.birth_date = birth_date;
  }

  public getPhone(): string {
    return this.phone;
  }
  public setEmail(email: string) {
    this.email = email;
  }

  public getEmail(): string {
    return this.email;
  }

  public setPhone(phone: string) {
    this.phone = phone;
  }

  public getPassword(): string {
    return this.password;
  }

  public setPassword(password: string) {
    this.password = password;
  }

  public setCPF(cpf: string) {
    this.cpf = cpf;
  }

  public getCPF(): string {
    return this.cpf;
  }
}

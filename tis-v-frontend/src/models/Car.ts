export class Car {
    public model: String;
    public plate: String;
    public year: Int16Array;

    constructor() { }
    
    public getModel(): String {
        return this.model;
    }

    public setModel(model: String) {
        this.model = model;
    }

    public getPlate(): String {
        return this.plate;
    }

    public setPlate(plate: String) {
        this.plate = plate;
    }

    public getYear(): Int16Array {
        return this.year;
    }

    public setYear(year: Int16Array){
        this.year = year;
    }

}
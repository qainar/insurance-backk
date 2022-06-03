import carModel from "../models/carModel.js";

export class CarService{
    async create(req){
        const data = await carModel.create(req)
        return data
    }
}
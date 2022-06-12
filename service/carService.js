import carModel from "../models/carModel.js";

export class CarService{
    async create(req){
        req.name = 'Машина'
        const data = await carModel.create(req)
        return data
    }
}
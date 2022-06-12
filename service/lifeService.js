import LifeModel from "../models/lifeModel.js";

export class LifeService{
    async create(req){
        req.name = 'Жизнь'
        const data = await LifeModel.create(req)
        return data
    }
}
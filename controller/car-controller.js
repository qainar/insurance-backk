import {CarService} from "../service/carService.js";
import {ObjectId} from "mongodb";
import carModel from "../models/carModel.js";
const carService = new CarService()

export class CarController{
    async create(req,res,next){
        try {
            const data = await carService.create(req.body)
            console.log(data)
            return res.json(data)

        }catch (e) {
            next(e)
        }
    }
    async getOne(req,res,next){
        try {
            const {id} = req.params
            const data = await carModel.findOne({_id: ObjectId(id)})
            return res.json(data)
        }catch (e) {
            next(e)
        }
    }
    async getAll(req,res,next){
        try {
            const { userId } = req.query
            const data = await carModel.find({userId: userId})
            return res.json(data)
        }catch (e) {
            next(e)
        }
    }
}

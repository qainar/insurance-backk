import UserSchema from "../models/user-model.js";
import {ObjectId} from "mongodb";
import {LifeService} from "../service/lifeService.js";
import lifeModel from "../models/lifeModel.js";

const lifeService = new LifeService()
export class LifeController{
    async create(req,res,next){
        try {
            const data = await lifeService.create(req.body)
            return res.json(data)
        }catch (e) {
            next()
        }
    }
    async getOne(req,res,next){
        try {
            const {id}= req.params
            const data = await UserSchema.findOne({_id: ObjectId(id)})
            return res.json(data)
        }
        catch (e) {
            next(e)
        }
    }
    async getAll(req,res,next){
        try {
            const {userId} = req.query
            const data = await lifeModel.find({userId: userId})
            return res.json(data)
        }catch (e) {
            next(e)
        }

    }
}

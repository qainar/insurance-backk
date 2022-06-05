import {PropertyService} from "../service/property-service.js";
import {ApiError} from "../exceptions/api-error.js";
import property from "../models/property.js";
import {ObjectId} from "mongodb";
import mongoose from "mongoose";


const propertyService = new PropertyService()
export class PropertyController{
    async create(req,res,next){
        try {
            // const {type, period, price, userId} = req.body
            const data = await propertyService.create(req.body)
            return res.json(data)
        }catch (e) {
            next(e)
        }
    }
    async getOne(req,res,next){
        try {
            const { id } = req.params
            const data = await property.findOne({_id: ObjectId(id)})
            return res.json(data)
        }catch (e) {
            next(e)
        }
    }
    async getAll(req,res,next){
        try {
            const {userId} = req.query
            const data = await property.find({userId: userId})
            return res.json(data)
        }catch (e) {
            next(e)
        }
    }
}
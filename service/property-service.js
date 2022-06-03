import property from "../models/property.js";
import {ApiError} from "../exceptions/api-error.js";
import {PropertyDto} from "../dtos/property-dto.js";
import {ObjectId} from "mongodb";
import TokenSchema from "../models/token-model.js";

export class PropertyService {
    async create(req) {
        const data = await property.create(req)
        return data
    }
}

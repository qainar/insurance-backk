import mongoose from "mongoose";


const LifeModel = new mongoose.Schema({
    IIN: {type: Number, required: true},
    year: {type: Number, required: true},
    userId: {type: mongoose.Schema.Types.ObjectId, ref: 'User'},
})

export default mongoose.model('LifeModel', LifeModel)
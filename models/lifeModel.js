import mongoose from "mongoose";


const LifeModel = new mongoose.Schema({
    name: {type:String,value:'Жизнь'},
    IIN: {type: String, required: true},
    year: {type: String, required: true},
    userId: {type: mongoose.Schema.Types.ObjectId, ref: 'User'},
})

export default mongoose.model('LifeModel', LifeModel)
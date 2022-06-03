import mongoose from "mongoose";


const LifeModel = new mongoose.Schema({
    userId: {type: mongoose.Schema.Types.ObjectId, ref: 'User'}
})

export default mongoose.model('LifeModel', LifeModel)
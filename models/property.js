import mongoose from "mongoose";


const Property = new mongoose.Schema({
    type: {type: String, enum: ["Жилье", "Здания"] ,required: true},
    period: {type: Number, required: true},
    price: {type: Number, required: true},
    userId: {type: mongoose.Schema.Types.ObjectId, ref: 'User'}
})

export default mongoose.model('Property', Property)
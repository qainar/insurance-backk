import mongoose from "mongoose";


const Property = new mongoose.Schema({
    type: {type: String, enum: ["Жилье", "Здания"] ,required: true},
    period: {type: String, required: true},
    price: {type: String, required: true},
    userId: {type: mongoose.Schema.Types.ObjectId, ref: 'User'}
})

export default mongoose.model('Property', Property)
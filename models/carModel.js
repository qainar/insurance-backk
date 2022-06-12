import mongoose from "mongoose";


const carSchema = new mongoose.Schema({
    name: {type: String, value: 'Машина'},
    priceOfCar: {type: Number, required: true},
    yearOfRelease: {type: Number, required: true},
    userId: {type: mongoose.Schema.Types.ObjectId, ref: 'User'}
})

export default mongoose.model('Car', carSchema)
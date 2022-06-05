import mongoose from "mongoose";

const UserSchema = new mongoose.Schema({
    IIN: {type: Number},
    email: {type: String, unique: true, required: true},
    password: {type: String, required: true},
    name: {type: String,  required: true},
    number: {type: String, unique: true, required: true},
    isActivated: {type: Boolean, default: false},
    activationLink: {type: String},
})

export default mongoose.model('User', UserSchema)
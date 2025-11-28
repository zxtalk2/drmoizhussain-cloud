import mongoose from "mongoose"
const schema = new mongoose.Schema({
    name:String,
    age: Number,
    email: String,
    gender: String
});
export const FUCK_MODEL = mongoose.models.test1 || mongoose.model('test1', schema);
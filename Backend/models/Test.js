import mongoose from "mongoose";
const LawSchema = new mongoose.Schema({
    name : String,
    description : String
})
const LawModel = mongoose.model("laws",LawSchema)

export default LawModel
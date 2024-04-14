import mongoose from "mongoose";
const FeedbackSchema = new mongoose.Schema({
    name : String,
    mobile : Number,
    feedback : String
})
const FeedbackModel = mongoose.model("Feedback",FeedbackSchema)

export default FeedbackModel
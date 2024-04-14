import mongoose from "mongoose";
const pdfDetailsSchema = new mongoose.Schema({
    pdf : String,
    title : String
})
const pdfDetailsModel = mongoose.model("pdfDetails",pdfDetailsSchema)

export default pdfDetailsModel
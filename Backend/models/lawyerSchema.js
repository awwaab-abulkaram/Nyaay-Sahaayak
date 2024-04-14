import mongoose from "mongoose";
// Define lawyer schema
const lawyerSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  state: {
    type: String,
    required: true
  },
  type: {
    type: String,
    required: true
  },
  experience: {
    type: Number,
    required: true
  },
  rating: {
    type: Number,
    required: true
  },
  email: {
    type: String,
    required: true
  },
  mobile: {
    type: Number,
    required: true
  }
});

// Create lawyer model
const Lawyer = mongoose.model('Lawyer', lawyerSchema);
export default Lawyer

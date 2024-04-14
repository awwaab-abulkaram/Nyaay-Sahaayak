import mongoose from 'mongoose';

const cardSchema = new mongoose.Schema({
  domain: {
    type: String,
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
  image: {
    type: String,
    required: true,
  },
  pdfs: [{
    language: {
      type: String,
      required: true,
    },
    url: {
      type: String,
      required: true,
    },
  }],
  tags: {
    type: [String],
    default: [],
  },
});

const Card = mongoose.model('Card', cardSchema);

export default Card;

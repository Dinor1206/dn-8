const mongoose = require("mongoose");

const { Schema, model } = mongoose;

const BookSchema = new Schema({
  title: { type: String, required: true },
  period: { type: String, required: true },
  img: { type: String, required: true },
  genre: { type: String, required: true },
  publishedYear: { type: String, required: true },
  page: { type: String, required: true },
  publishedHome: { type: String, required: true },
  desc: { type: String, required: true },
  author_info: {
    type: Schema.Types.ObjectId,
    ref: "Author", // model nomi shu bo‘lishi shart!
    required: true
  }
},
{
  versionKey: false,
  timestamps: true
});

module.exports = model("Book", BookSchema);

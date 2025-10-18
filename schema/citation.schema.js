const mongoose = require("mongoose");

const { Schema, model } = mongoose;

const CitationSchema = new Schema({
  text: { type: String, required: true },
 
  book_id: {
    type: Schema.Types.ObjectId,
    ref: "Book",
    required: true
  }
},
{
  versionKey: false,
  timestamps: true
});

module.exports = model("Citation", CitationSchema);

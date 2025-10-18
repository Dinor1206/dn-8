const mongoose = require('mongoose');
const { Schema, model } = mongoose;

const AudiobookSchema = new Schema({
  title: { type: String, required: true },
  description: { type: String },
  author: { type: Schema.Types.ObjectId, ref: 'Author', required: true },
  audioUrl: { type: String }, // fayl path/URL
  publishedAt: { type: Date },
  genres: [{ type: String }],
})

module.exports = model('Audiobook', AudiobookSchema);

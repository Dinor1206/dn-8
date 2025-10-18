const mongoose = require("mongoose");
const { Schema, model } = mongoose;

const AuthorSchema = new Schema({
  full_name: {
    type: String,
    required: [true,"full name bo'lishi shart"],
    set:value=>value.trim(""),
    match:[/^[a-zA-z\s]+$/],
    minLength:3,
    maxLength:50
  },
  birth_date: {
    type: Date,
    required: true,
    min:[1,"kamida 1yil bo'lishi kk"],
    max:2020
  },
  death_date: {
    type: String,
    required: true
  },
  img: {
    type: String,
    required: true
  }
}, {
  versionKey: false,
  timestamps: true
});


module.exports = model("Author", AuthorSchema);

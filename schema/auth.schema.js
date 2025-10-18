const { number, boolean, string } = require("joi");
const mongoose = require("mongoose");
const { Schema, model } = mongoose;

const Auth = new Schema({
  username: {
    type: String,
    required: true
  },
   email: {
    type: String,
    required: true
  },
  password: {
    type: String,
    required: true
  },
  role: {
    type: String,
    required: true,
    enum:{
        values:["user","admin","superadmin"],
        message:`{VALUE}bunday qiymat qabul qilmaydi`
    },
    default:"user"
  },
   otp: {
    type: String,
    required: true
  },
   otpTime:{
     type: Number,
    required: false
  },
  isVerified:{
     type:Boolean,
    required: false
  },
  isVerifiedForgotPassword:{
     type:Boolean,
    required: false
  },
 
   firstName: {
    type: String,
    required: false,
    default:null
  },
   lastName: {
    type: String,
     required: false,
    default:null
  },
   phoneNumber: {
    type: Number,
      required: false,
    default:null
  },
    img: {
    type: String,
      required: false,
    default:null
  }
}, {
  versionKey: false,
  timestamps: true
});


module.exports = model("Auth", Auth);
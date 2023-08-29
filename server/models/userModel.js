const mongoose=require("mongoose");

const userSchema=new mongoose.Schema({
    firstname:{type: String,required: true,minLength: 2,},
    lastname:{type: String,required: true,minLength: 2,},
    email:{type: String,required: true,unique: true,},
    password:{type: String,required: true,minLength: 3},
    isAdmin: {
        type: Boolean,
        default: false,
    },
    isDoctor: {
        type: Boolean,
        default: false,
    },
    age: {
      type: Number,
      default: "",
    },
    gender: {
      type: String,
      default: "neither",
    },
    mobile: {
      type: Number,
      default: "",
    },
    address: {
      type: String,
      default: "",
    },
    status: {
        type: String,
        default: "pending",
    },
  },
    {
        timestamps: true,
    }
);

const userModel=mongoose.model("User",userSchema);
module.exports= userModel;
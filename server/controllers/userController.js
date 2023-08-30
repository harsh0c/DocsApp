const User= require('../models/userModel')
const bcrypt= require("bcrypt");
const Doctor=require("../models/doctorModel");
const Appointment = require("../models/appointmentModel");
const jwt=require("jsonwebtoken")

const login=async(req,res)=>{
    try {
        const emailPresent = await User.findOne({email: req.body.email});
        if(!emailPresent){
            return res.status(400).send("Incorrect credentials");
        }
        const verifyPass=await bcrypt.compare(req.body.password,emailPresent.password);
        if(!verifyPass){
            return res.status(400).send("Incorrect credentials");
        }
        const token=jwt.sign({id:emailPresent._id,isAdmin: emailPresent.isAdmin},process.env.JWT_SECRET,{expiresIn: '1d'})
        return res.status(200).send({msg:"User Logged in successfully",token});
    } catch (error) {
        res.status(500).send("Unable to login user");
    }
}

const register=async(req,res)=>{
    try {
        const existingUser=await User.findOne({email: req.body.email});
        if(existingUser){
            return res.status(400).send("Email already exists")
        }
        const hashedPass = await bcrypt.hash(req.body.password, 10);
        const user = await User({ ...req.body, password: hashedPass });
        const result = await user.save();
        if (!result) {
            return res.status(500).send("Unable to register user");
        }
    return res.status(201).send("User registered successfully");
    } catch (error) {
        console.log(error)
        res.status(500).send("Unable to register user");
    }
}

const getallusers=async(req,res)=>{
    try {
        const users= await User.find()
            .find({_id: { $ne: req.locals} })
            .select("-password");
        return res.send(users);
    } catch (error) {
        res.status(500).send("Unable to get all users");
    }
}

const getuser= async(req,res)=>{
    try {
        const user= await User.findById(req.params.id).select("-password");
        return res.send(user);
    } catch (error) {
        res.status(500).send("Unable to get user");
    }
};

const deleteuser = async (req, res) => {
    try {
      const result = await User.findByIdAndDelete(req.body.userId);  // user
      const removeDoc = await Doctor.findOneAndDelete({         // doctor
        userId: req.body.userId,
      });
      const removeAppoint = await Appointment.deleteMany({    // appointment
        userId: req.body.userId,
      });
      return res.send("User deleted successfully");
    } catch (error) {
        // console.log("err "+error);
        res.status(500).send("Unable to delete user");
    }
};


module.exports={
    login,
    register,
    getallusers,
    getuser,
    deleteuser,
}
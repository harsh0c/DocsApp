const Appointment= require("../models/appointmentModel");
const User= require("../models/userModel");

const bookappointment=async(req,res)=>{
    try {
        const appointment= await Appointment({
            date: req.body.date,
            time: req.body.time,
            doctorId: req.body.doctorId,
            userId: req.locals,
        });

        const result= await appointment.save();
        return res.status(201).send(result);
    } catch (error) {
        console.log(error);
        res.status(500).send("Unable to book appointment");
    }
}

const getallappointments= async(req,res)=>{
    try {
        const keyword = req.query.search
        ? {
            $or: [{ userId: req.query.search }, { doctorId: req.query.search }],
          }
        : {};
          // {} for Admin to getallappointments of all users.
      const appointments = await Appointment.find(keyword)
        .populate("doctorId")
        .populate("userId");
      return res.send(appointments); 
    } catch (error) {
        res.status(500).send("Unable to get apponintments");
    }
}

const completed= async(req,res)=>{
    try {
        const alreadyFound= await Appointment.findOneAndUpdate(
            {_id: req.body.appointid},
            {status: "Completed"}
        )

        return res.status(201).send("Application completed");
    } catch (error) {
        res.status(500).send("Unable to complete appointment");
    }
}

const deleted=async(req,res)=>{
    try {
        const result = await Appointment.findByIdAndDelete(req.body.userId);  // app

        return res.send("Appointment deleted successfully");
    } catch (error) {
        console.log("delerror" + error);
        res.status(500).send("Unable to delete appointment");
    }
}

module.exports={
    bookappointment,
    getallappointments,
    completed,
    deleted,
}
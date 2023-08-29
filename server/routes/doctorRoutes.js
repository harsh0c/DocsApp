const express = require("express");
const doctorController = require("../controllers/doctorController");
const auth=require("../middleware/authMiddleware");

const doctorRouter = express.Router();

doctorRouter.post("/applyfordoctor",auth,doctorController.applyfordoctor);

doctorRouter.get("/getnotdoctors",auth,doctorController.getnotdoctors);

doctorRouter.put("/acceptdoctor",auth,doctorController.acceptdoctor);

doctorRouter.put("/rejectdoctor",auth,doctorController.rejectdoctor);

doctorRouter.get("/getalldoctors",doctorController.getalldoctors);

doctorRouter.put("/deletedoctor", auth, doctorController.deletedoctor);

module.exports=doctorRouter;
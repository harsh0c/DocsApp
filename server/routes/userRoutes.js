const express=require("express");
const userController =require("../controllers/userController");
const auth = require("../middleware/authMiddleware");

const router=express.Router();

// Login || post
router.post('/login',userController.login);

// register || post
router.post('/register',userController.register);

// getallusers || get
router.get('/getallusers',auth,userController.getallusers);

// get single user ||  dispatch userInfo while logging in.
router.get("/getuser/:id",auth,userController.getuser);

router.delete("/deleteuser",auth,userController.deleteuser);

module.exports= router;
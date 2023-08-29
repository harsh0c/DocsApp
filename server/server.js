const express=require("express")
const mongoose=require("mongoose")
const cors=require("cors");
const dotenv=require("dotenv")
const app=express();

dotenv.config();

const userRouter=require("./routes/userRoutes");
const doctorRouter=require("./routes/doctorRoutes");
const appointRouter=require("./routes/appointRoutes");

const connectDB=async()=>{
    try {
        await mongoose.connect(process.env.MONGO_URL)
        console.log("MongoDB connected")
    } catch (error) {
       console.log("MongoDB error") 
    }
}

connectDB();

app.use(cors());
app.use(express.json())

app.use("/api/user",userRouter);
app.use("/api/doctor",doctorRouter);
app.use("/api/appointment",appointRouter);


app.get("/",async(req,res)=>{
    res.send("Backend..");
})

const port=process.env.PORT || 8080;
app.listen(port,()=>{
    console.log("Server running")
});
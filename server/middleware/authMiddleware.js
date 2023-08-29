const jwt=require("jsonwebtoken")

const auth=(req,res,next)=>{
    try {
        const token= req.headers.authorization.split(" ")[1];  // Bearer token
        const verifyToken=jwt.verify(token,process.env.JWT_SECRET);
        if(!verifyToken){
            return res.status(401).send("Token error");
        }
        req.locals=verifyToken.id;    // req.body.userId
        next();
    } catch (error) {
        console.log(error);
        return error;
    }
}

module.exports=auth;
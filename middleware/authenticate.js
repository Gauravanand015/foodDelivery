const jwt = require("jsonwebtoken");

const authenticate = (req,res,next)=>{
    const token = req.headers.authorization;
    if(token){
        jwt.verify(token,"ALPHA",(err,decoded)=>{
            if(err){
                console.log(err);
                res.send("Error in middleware")
            }else{
                req.body.email = decoded.email;
                req.body._id = decoded._id;
                console.log(decoded)
                next()
            }
        })
    }
    else{
        res.send("Invalid Token")
    }
}

module.exports = {
    authenticate
}
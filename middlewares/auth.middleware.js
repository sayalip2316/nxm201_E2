const UserModel=require("../models/user.model")
const jwt=require("jsonwebtoken")

async function authenticate(req,res,next){
    const {token}=req.headers
    const decodedData = jwt.verify(token,"abrakadabra")
    const user=await UserModel.findOne({email:decodedData.email})
    if(!user){
       return res.status(401).json({msg:"Unauthorized user!"})
    }
    req.user = user
    next()
}

function authorize(roles){
    return (req,res,next)=>{
        if(!roles.includes(req.user.role)){
            return res.status(401).json({msg:"Unauthorized user!"})
        }
        next() 
    }
    

}

module.exports = [authenticate, authorize]
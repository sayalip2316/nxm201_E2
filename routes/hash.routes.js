const express=require("express")
const hashRouter=express.Router()
const {HashModel}=require("../models/hash.model")
const bcrypt=require("bcrypt")


hashRouter.post("/hashmypwd",async(req,res)=>{
    const {id,password}=req.body
    bcrypt.hash(password, 5, async(err, hash)=>{
        if(err){
            res.status(500).send("something went wrong")
        }
        if(hash){
            const user=new HashModel({id,password:hash})
            await user.save()
            res.status(200).send({"msg":"Hash of the Password stored successfully."})
        } 
    });
})

hashRouter.post("/verifymypwd",async(req,res)=>{
    const {id,password}=req.body
    const user=await HashModel.findOne({id})
    if(!user){
        res.status(400).send({msg:"User dosent found"})
    }else{
        bcrypt.compare(password, user.password, function(err, result) {
           if(err){
            res.status(400).send({msg:"Wrong Credentials"})
           }else{
            res.status(200).json(result)
           }
        });
    }
})


module.exports={hashRouter}


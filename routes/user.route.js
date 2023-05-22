const express=require("express")
const userRouter=express.Router()
const UserModel=require("../models/user.model")
const bcrypt=require("bcrypt")
const jwt=require("jsonwebtoken")

userRouter.post("/signup",async(req,res)=>{
    const{email,password,role}=req.body
    const user=await UserModel.findOne({email})
    if(user){
        // res.status(400).send({msg:"User already exists"})
    }else{
         const newuser=new UserModel({email,password,role})
         await newuser.save()
         res.status(200).send({msg:"User signin successfully"})
    }
})

userRouter.post("/login",async(req,res)=>{
    const {email,password,role}=req.body
    const user=await UserModel.findOne({email})
    if(!user){
        return res.status(400).json({msg:"User dosen't exists"})
    }
    const isPasswordMatch=await bcrypt.compare(password,user.password)
    if(!isPasswordMatch){
        return res.status(401).json({msg:"Invalid email or password"})
    }
    const token=jwt.sign({email},'abrakadabra',{expiresIn:'1h'})

    const refreshToken =jwt.sign({email},'abrakadabra',{expiresIn:'7h'})
    
    res.json({token,refreshToken})
})




module.exports={userRouter}